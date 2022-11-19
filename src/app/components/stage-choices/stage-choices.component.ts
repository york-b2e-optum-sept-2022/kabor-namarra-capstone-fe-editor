import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {STAGE_TYPES} from "../../enums/STAGE_TYPES";
import {ProcessService} from "../../process.service";

@Component({
  selector: 'app-stage-choices',
  templateUrl: './stage-choices.component.html',
  styleUrls: ['./stage-choices.component.css']
})
export class StageChoicesComponent implements OnInit, OnDestroy {

  @Input() choice!: string;
  @Input() stageType!: STAGE_TYPES;
  newChoice: string ="";

  constructor(public processService: ProcessService) { }

  ngOnInit(): void {

  }
  ngOnDestroy() {
    // this.processService.onDestroyStage(this.choice);
  }

}
