import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProcessService} from "../../process.service";
import {IProcess} from "../../interfaces/IProcess";
import {IStage} from "../../interfaces/IStage";
import {Subject, takeUntil} from "rxjs";
import {STAGE_TYPES} from "../../enums/STAGE_TYPES";

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit, OnDestroy {

  process!: IProcess;
  stage: IStage = {choiceText: [],stage_type: STAGE_TYPES.TEXT_ANSWER,stageOrder: 0, question: "" };
  onDestroy = new Subject();
  updatingProcess: boolean = false;
  confirm: boolean = false;
  canGoDown: boolean = false;
  canGoUp: boolean = false;
  stagePoint: number = 1;


  constructor(public processService: ProcessService) {
    this.processService.$process.pipe(takeUntil(this.onDestroy)).subscribe( process => {
      this.process = process;
      this.stage = process.stages[0]
      if(process.stages.length >1){
        this.canGoUp = true;
      }
    })
    this.processService.$updatingProcess.pipe(takeUntil(this.onDestroy)).subscribe( updating => {
      this.updatingProcess = updating;
    })
  }

  ngOnInit(): void {
    this.processService.getProcess();
  }
  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
  onBackClick(){
    this.processService.onViewing();
  }
  onUpdateClick(){
    this.processService.onSendUpdatingProcess(this.process);
  }
  onDeleteClick(){
    this.confirm = !this.confirm
  }
  onConfirmClick(){
    if(this.process.id) {
      this.processService.onDeleteClick(this.process.id)
    }
  }

  onNextClick(){
    this.stagePoint ++;
    if(this.stage) {
      if (this.stage.stageOrder) {
        this.stage = this.process.stages[this.stage.stageOrder]
        this.canGoDown = true;
      }
    }

    if(this.stage.stageOrder){
      if(this.process.stages.length > this.stage.stageOrder){
        this.canGoUp = true;
      }else {
        this.canGoUp = false;
      }
    }

  }
  onPreviousClick(){
    this.stagePoint --;
    if(this.stage) {
      if (this.stage.stageOrder) {
        this.stage = this.process.stages[this.stage.stageOrder-2]
        this.canGoUp = true;
      }
    }
    if(this.stage.stageOrder){
      if(1 < this.stage.stageOrder){
        this.canGoDown = true;
      }else {
        this.canGoDown = false;
      }
    }
  }

}
