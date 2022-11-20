import {Component, OnDestroy, OnInit} from '@angular/core';
import {IStage} from "../../interfaces/IStage";
import {STAGE_TYPES} from "../../enums/STAGE_TYPES";
import {Subject, takeUntil} from "rxjs";
import {ProcessService} from "../../process.service";

@Component({
  selector: 'app-edit-creating-stage',
  templateUrl: './edit-creating-stage.component.html',
  styleUrls: ['./edit-creating-stage.component.css']
})
export class EditCreatingStageComponent implements OnInit, OnDestroy{

  stage!: IStage;
  onDestroy = new Subject();

  constructor(public processService: ProcessService) {
    this.processService.$stageCreatingEditing.pipe(takeUntil(this.onDestroy)).subscribe( stage => {
      this.stage = stage;
    })
  }

  ngOnInit(): void {
    this.processService.onStageCreatingEditing();
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
    this.processService.onEditStage();
  }

  onSaveClick(){
    this.processService.onUpdateCreatingStage(this.stage);
  }

}
