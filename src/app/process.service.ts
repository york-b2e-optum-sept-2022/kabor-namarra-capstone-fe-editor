import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IProcess} from "./interfaces/IProcess";
import {IStage} from "./interfaces/IStage";
import {STAGE_TYPES} from "./enums/STAGE_TYPES";
import {IChoice} from "./interfaces/IChoice";
import {IProcessCreating} from "./interfaces/IProcessCreating";
import {IStageCreating} from "./interfaces/IStageCreating";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  $creatingProcess = new Subject<boolean>()
  $processList = new Subject<IProcess[]>()
  $viewingProcess = new Subject<boolean>()
  $process = new Subject<IProcess>()

  $stageList = new Subject<IStage[]>()
  $newProcessStageList = new Subject<IStage[]>();
  $creatingStage = new Subject<boolean>();
  $newProcessStageListLength = new Subject<number>();

  $choice = new Subject<IChoice>();
  $stageType = new Subject<STAGE_TYPES>();
  $stageIndex = new Subject<number>();
  $editingStage = new Subject<boolean>();
  $stageCreatingEditing = new Subject<IStage>();

  private creatingProcess: boolean = false;
  private processList: IProcess[] = [];
  private viewingProcess: boolean = false;
  private process!: IProcess;

  private stageList!: IStage[];
  private newProcessStageList: IStage[] = [];
  private creatingStage: boolean = false;
  private stageIndex!: number;
  private editingStage: boolean = false;

  private newCreatingProcess: IProcessCreating = {name:"", stages: []};

  constructor(public http: HttpService) { }

  getProcessList(){
    this.processList = [];
    this.http.getProcessList().pipe(first()).subscribe({
      next: (processList) => {
        for(let process of processList){

          let getStageList: IStage[] = [];

          for(let stage of process.stages){

            if(stage.stage_type && stage.stageOrder && stage.choiceText && stage.question) {

              let choiceList: IChoice[] = [];

              for (let stageChoice of stage.choiceText) {
                choiceList.push({choice: stageChoice})
              }

              getStageList.push({id: stage.id, choiceText:choiceList, stage_type: stage.stage_type, stageOrder: stage.stageOrder, question:stage.question})
            }

          }
            this.processList.push({id: process.id, name: process.name, stages: getStageList});

        }

        this.$processList.next(this.processList);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  onSaveProcessService(process: IProcess){
    console.log(process);
    console.log(this.newProcessStageList)
    if(process.name) {
      this.newCreatingProcess.name = process.name;
    }

    for(let stage of process.stages){
      let newChoiceList: string[] = [];

      for(let choice of stage.choiceText){
        newChoiceList.push(choice.choice)
      }
      if(stage.stage_type && stage.stageOrder && stage.question) {
        this.newCreatingProcess.stages.push({
          choiceText: newChoiceList,
          stage_type: stage.stage_type,
          stageOrder: stage.stageOrder,
          question: stage.question
        })
      }
    }

    this.http.onSaveProcessClient(this.newCreatingProcess).pipe(first()).subscribe( {
      next: (process) => {
        console.log(process)
        this.onCreatingProcess();
      },
      error: (err) => {
        console.error(err)
      }
    })
  }


  // getStageList(){
  //   if(this.process.id) {
  //     this.http.getProcessStages(this.process.id).pipe(first()).subscribe({
  //       next: (stageList) => {
  //         console.log(stageList);
  //         this.stageList = stageList;
  //         this.$stageList.next(this.stageList);
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       }
  //     })
  //   }
  // }

  onAddStage(){
    this.creatingStage = !this.creatingStage;
    this.$creatingStage.next(this.creatingStage);
  }



  onCreatingProcess(){
    this.newProcessStageList = [];
    this.creatingProcess = !this.creatingProcess;
    this.$creatingProcess.next(this.creatingProcess);
  }

  onProcessClick(process: IProcess){
    this.process = process;
    this.viewingProcess = !this.viewingProcess;
    this.$viewingProcess.next(this.viewingProcess);
  }

  getProcess(){
    this.$process.next(this.process);
  }

  onStopViewing(){
    this.viewingProcess = !this.viewingProcess;
    this.$viewingProcess.next(this.viewingProcess);
  }

  getNewProcessStages(){
    this.$newProcessStageList.next(this.newProcessStageList);
  }

  organizeNewProcessStageList(){
    console.log("organizing:")
    console.log(this.newProcessStageList)
    // for(let index in this.newProcessStageList){
    //
    //   if(this.newProcessStageList[index].stageOrder){this.newProcessStageList[index].stageOrder = }
    // }
    this.newProcessStageList.forEach((value, index) =>{
        if(value.stageOrder){value.stageOrder = index +1}
    })
    this.$newProcessStageList.next(this.newProcessStageList);
  }
  onSubtractStageService(index: number){
    this.newProcessStageList.splice(index,1);
    this.organizeNewProcessStageList()
  }

  onUpStageClick(index: number){
    this.newProcessStageList.splice((index-1),0,this.newProcessStageList[index]);
    this.newProcessStageList.splice(index+1,1);
    this.organizeNewProcessStageList();
  }
  onDownStageClick(index:number){
    this.newProcessStageList.splice((index),0,this.newProcessStageList[index+1]);
    this.newProcessStageList.splice(index+2,1);
    this.organizeNewProcessStageList();
  }

  onCreateStage(){
    this.creatingStage = !this.creatingStage;
    this.$creatingStage.next(this.creatingStage);
  }

  onSaveCreatedStage(stage: IStage){
    console.log(stage)
    this.newProcessStageList.push(stage);
    this.creatingStage = !this.creatingStage;
    this.$creatingStage.next(this.creatingStage);
  }

  getNewStageOrder(){
    this.$newProcessStageListLength.next(this.newProcessStageList.length +1);
  }

  onDestroyStage(choice: IChoice){
    this.$choice.next(choice);
  }

  onEditCreatingStage(index:number){
    this.stageIndex = index;
    this.onEditStage();
  }
  onEditStage(){
    this.editingStage = !this.editingStage
    this.$editingStage.next(this.editingStage);
  }
  onStageCreatingEditing(){
    this.$stageCreatingEditing.next(this.newProcessStageList[this.stageIndex]);
  }

  onUpdateCreatingStage(stage: IStage){
    this.newProcessStageList.splice(this.stageIndex,1)
    this.newProcessStageList.splice(this.stageIndex, 0, stage)
    this.onEditStage();
  }


}
