import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProcessService} from "../../process.service";
import {IProcess} from "../../interfaces/IProcess";
import {IStage} from "../../interfaces/IStage";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrls: ['./create-process.component.css']
})
export class CreateProcessComponent implements OnInit, OnDestroy{

  process: IProcess = {name:"", stages: []}

  stageList: IStage[] = [];

  creatingStage: boolean = false;
  editingStage: boolean = false;
  updatingProcess: boolean =false;
  onDestroy = new Subject();


  constructor(public processService: ProcessService) {
    this.processService.$newProcessStageList.pipe(takeUntil(this.onDestroy)).subscribe( newProcessStages => {
      this.process.stages = newProcessStages;
      console.log(newProcessStages)
    })
    this.processService.$creatingStage.pipe(takeUntil(this.onDestroy)).subscribe( creatingStage => {
      this.creatingStage = creatingStage;
      this.processService.getNewProcessStages();
    })
    this.processService.$editingStage.pipe(takeUntil(this.onDestroy)).subscribe( editingStage => {
      this.editingStage = editingStage;
    })
    this.processService.$processBeingUpdated.pipe(takeUntil(this.onDestroy)).subscribe( process => {
      this.process = process;
      this.updatingProcess = true;
    })
  }

  ngOnInit(): void {
    this.processService.getNewProcessStages();
    this.processService.getUpdatingProcess();
  }
  ngOnDestroy() {
    this.updatingProcess = false;
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onCloseUpdatedClick(){
    this.processService.onUpdatingProcessRequest()
  }
  onSaveProcessUpdated(){
    this.processService.onSaveUpdatedProcess(this.process)
  }

  onCloseClick(){
    this.processService.onCreatingProcess();
  }

  onAddClick(){
    this.processService.onCreateStage();
  }

  onSaveProcess(){
    this.processService.onSaveProcessService(this.process);
  }

  onSubtractStage(index: number){
    this.processService.onSubtractStageService(index);
  }

  onUpClick(index:number){
    this.processService.onUpStageClick(index)
  }
  onDownClick(index: number){
    this.processService.onDownStageClick(index)
  }

  onEditClick(index:number){
    this.processService.onEditCreatingStage(index);
  }

}
