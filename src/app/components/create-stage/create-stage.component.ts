import {Component, OnDestroy, OnInit} from '@angular/core';
import {STAGE_TYPES} from "../../enums/STAGE_TYPES";
import {ProcessService} from "../../process.service";
import {IStage} from "../../interfaces/IStage";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-create-stage',
  templateUrl: './create-stage.component.html',
  styleUrls: ['./create-stage.component.css']
})
export class CreateStageComponent implements OnInit, OnDestroy{

    stage: IStage = { choiceText: [{choice:""}], stage_type: STAGE_TYPES.TEXT_ANSWER,stageOrder: 0, question: ""}
    // choiceText: string[] = [];
    // stage_type: STAGE_TYPES = STAGE_TYPES.TEXT_ANSWER;
    // question: string = "";
    onDestroy = new Subject();



  constructor(public processService: ProcessService) {
    this.processService.$newProcessStageListLength.pipe(takeUntil(this.onDestroy)).subscribe( stageOrder => {
      this.stage.stageOrder =stageOrder
    })
    this.processService.$choice.pipe(takeUntil(this.onDestroy)).subscribe( choice =>{
      this.stage.choiceText.push(choice);
      // this.stage.choiceText.shift();
    })
  }

  ngOnInit(): void {
    this.processService.getNewStageOrder()
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onInputClick(){
    this.stage.stage_type = STAGE_TYPES.TEXT_ANSWER;
  }

  onMultipleChoiceClick(){
    this.stage.stage_type = STAGE_TYPES.MULTIPLE_CHOICE;
  }

  onCheckboxClick(){
    this.stage.stage_type = STAGE_TYPES.MULTIPLE_CHECKBOX;
  }

  onAddChoice(){
    this.stage.choiceText.push({choice:""})
  }
  onSubtractChoice(index: number){
    this.stage.choiceText.splice(index,1);
  }

  onCancelClick(){
    this.processService.onCreateStage()
  }

  onSaveClick(){
    this.processService.onSaveCreatedStage(this.stage)
  }

  customTrackBy(index: number, obj: any) {
    return index;
  }


}
