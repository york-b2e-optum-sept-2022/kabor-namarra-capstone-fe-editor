import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IProcess} from "./interfaces/IProcess";
import {IStage} from "./interfaces/IStage";
import {STAGE_TYPES} from "./enums/STAGE_TYPES";
import {IChoice} from "./interfaces/IChoice";
import {IProcessCreating} from "./interfaces/IProcessCreating";
import {IStageCreating} from "./interfaces/IStageCreating";
import {IProcessUpdating} from "./interfaces/IProcessUpdating";
import {IProcessAnswered} from "./interfaces/IProcessAnswered";
import {IStageAnswered} from "./interfaces/IStageAnswered";

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
  $updatingProcess = new Subject<boolean>();
  $processBeingUpdated = new Subject<IProcess>();

  $choice = new Subject<IChoice>();
  $stageType = new Subject<STAGE_TYPES>();
  $stageIndex = new Subject<number>();
  $editingStage = new Subject<boolean>();
  $stageCreatingEditing = new Subject<IStage>();

  $viewingFinished = new Subject<boolean>();
  $finishedProcessList = new Subject<IProcess[]>();
  $finishedProcess = new Subject<IProcess>();
  $viewingFinishedProcess = new Subject<boolean>();

  private creatingProcess: boolean = false;
  private processList: IProcess[] = [];
  private viewingProcess: boolean = false;
  private process!: IProcess;
  private updatingProcess: boolean = false;
  private processBeingUpdated!: IProcess;

  private stageList!: IStage[];
  private newProcessStageList: IStage[] = [];
  private creatingStage: boolean = false;
  private stageIndex!: number;
  private editingStage: boolean = false;

  private viewingFinished: boolean = false;
  private finishedProcessList: IProcess[] = [];
  private finishedProcess!: IProcess;
  private viewingFinishedProcess: boolean = false;

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
        alert("Server is having an issue. Please try again later.")
        console.error(err);
      }
    })
  }

  onSaveProcessService(process: IProcess){
    console.log(process);
    console.log(this.newProcessStageList)
    let newCreatingProcess: IProcessCreating = {name:"", stages: []};

    if(process.name) {
      newCreatingProcess.name = process.name;
    }

    for(let stage of process.stages){
      let newChoiceList: string[] = [];

      for(let choice of stage.choiceText){
        newChoiceList.push(choice.choice)
      }
      if(stage.stage_type && stage.stageOrder && stage.question) {
        newCreatingProcess.stages.push({
          choiceText: newChoiceList,
          stage_type: stage.stage_type,
          stageOrder: stage.stageOrder,
          question: stage.question
        })
      }
    }

    this.http.onSaveProcessClient(newCreatingProcess).pipe(first()).subscribe( {
      next: (process) => {
        console.log(process)
        this.onCreatingProcess();
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
  onSaveUpdatedProcess(process: IProcess){
    console.log(process);
    console.log(this.newProcessStageList)
    let newCreatingProcess: IProcessUpdating = {name:"", stages: [], newStages: []};

    if(process.id) {
      newCreatingProcess.id = process.id;
    }
    if(process.name) {
      newCreatingProcess.name = process.name;
    }
    if(newCreatingProcess.newStages) {
      for (let stage of process.stages) {
        let newChoiceList: string[] = [];

        for (let choice of stage.choiceText) {
          newChoiceList.push(choice.choice)
        }
        if (stage.stage_type && stage.stageOrder && stage.question && !stage.id) {
          newCreatingProcess.newStages.push({
            choiceText: newChoiceList,
            stage_type: stage.stage_type,
            stageOrder: stage.stageOrder,
            question: stage.question
          })
        }
        if (stage.stage_type && stage.stageOrder && stage.question && stage.id) {
          newCreatingProcess.stages.push({
            id: stage.id,
            choiceText: newChoiceList,
            stage_type: stage.stage_type,
            stageOrder: stage.stageOrder,
            question: stage.question
          })
        }
      }
    }

    console.log(newCreatingProcess)

    this.http.onUpdateProcess(newCreatingProcess).pipe(first()).subscribe( {
      next: (process) => {
        console.log(process)
        this.process = process;
        this.onUpdatingProcessRequest();
      },
      error: (err) => {
        alert("Server is having an issue. Please try again later.")
        console.error(err)
      }
    })
  }

  getFinishedProcesses(){
    this.finishedProcessList = [];
    this.http.getFinishedProcesses().pipe(first()).subscribe({
      next: (finishedProcessList) => {
        for(let process of finishedProcessList){
          let getStageList: IStage[] = [];
          for(let stage of process.finishedStages){
            let choiceList: IChoice[] = [];

            if(stage.stage_type && stage.stageOrder && stage.choiceText && stage.question){
              for (let index in stage.choiceText) {
                choiceList.push({choice: stage.choiceText[index], response: stage.response[index]})
              }
            }
            getStageList.push({id: stage.id, choiceText: choiceList, stage_type: stage.stage_type, stageOrder: stage.stageOrder, question:stage.question})
          }
          this.finishedProcessList.push({id: process.id, name: process.name, stages: getStageList});
        }

        // for(let finishedProcess of finishedProcessList){
        //   let finishedStages: IStage[] = [];
        //   for(let stages of finishedProcess.finishedStages){
        //     console.log("hello")
        //     let choices: IChoice[] = [];
        //     for(let index in stages.choiceText){
        //       choices.push({choice: stages.choiceText[index], response: stages.choiceText[index]})
        //     }
        //     finishedStages.push({id: stages.id, choiceText: choices, stage_type: stages.stage_type, stageOrder: stages.stageOrder, question: stages.question})
        //   }
        //
        //   this.finishedProcessList.push({id: finishedProcess.id, name: finishedProcess.name, stages: finishedStages})
        // }

        this.$finishedProcessList.next(this.finishedProcessList);
        console.log(this.finishedProcessList)
      },
      error: (err) => {
        alert("Server is having an issue. Please try again later.")
        console.error(err)
      }
    })
  }

  onDeleteClick(processId: number){
    this.http.deleteProcess(processId).pipe(first()).subscribe({
      next: (deletedProcess) => {
        console.log("deleted")
        this.onViewing();
      },
      error: (err) => {
        alert("Server is having an issue. Please try again later.")
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

  // onAddStage(){
  //   this.creatingStage = !this.creatingStage;
  //   this.$creatingStage.next(this.creatingStage);
  // }



  onCreatingProcess(){
    this.newProcessStageList = [];
    this.creatingProcess = !this.creatingProcess;
    this.$creatingProcess.next(this.creatingProcess);
  }

  onSendUpdatingProcess(process: IProcess){
    this.processBeingUpdated = process
    this.newProcessStageList = process.stages
    this.onUpdatingProcessRequest();
  }
  onUpdatingProcessRequest(){
    this.updatingProcess = !this.updatingProcess;
    this.$updatingProcess.next(this.updatingProcess);
  }
  getUpdatingProcess(){
    if(this.updatingProcess) {
      this.$processBeingUpdated.next(this.processBeingUpdated);
    }
  }
  // onSaveUpdatedProcess(process: IProcess){
  //   console.log(process)
  //   this.process = process;
  //   this.onUpdatingProcessRequest();
  // }

  onProcessClick(process: IProcess){
    this.process = process;
    this.onViewing()
  }
  onFinishedProcessClick(finishedProcess: IProcess){
    this.finishedProcess = finishedProcess;
    this.onViewingFinishedProcess();
  }

  getProcess(){
    this.$process.next(this.process);
  }

  getFinishedProcess(){
    this.$finishedProcess.next(this.finishedProcess);
  }

  onViewingFinishedProcess(){
    this.viewingFinishedProcess = !this.viewingFinishedProcess
    this.$viewingFinishedProcess.next(this.viewingFinishedProcess)
  }

  onViewing(){
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

  // onDestroyStage(choice: IChoice){
  //   this.$choice.next(choice);
  // }

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

  onViewFinished(){
    this.viewingFinished = !this.viewingFinished;
    this.$viewingFinished.next(this.viewingFinished);
  }


}
