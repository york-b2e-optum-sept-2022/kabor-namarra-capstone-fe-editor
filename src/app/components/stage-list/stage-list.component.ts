import { Component, OnInit } from '@angular/core';
import {IStage} from "../../interfaces/IStage";
import {ProcessService} from "../../process.service";

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit {

  stageList!: IStage[];

  constructor(public processService: ProcessService) {
    this.processService.$stageList.subscribe( stageList => {
      this.stageList = stageList;
    })
  }

  ngOnInit(): void {
    // this.processService.getStageList();
  }

}
