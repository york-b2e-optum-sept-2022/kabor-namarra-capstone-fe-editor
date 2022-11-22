import {Component, Input, OnInit} from '@angular/core';
import {IStage} from "../../interfaces/IStage";
import {IStageAnswered} from "../../interfaces/IStageAnswered";

@Component({
  selector: 'app-finished-stage',
  templateUrl: './finished-stage.component.html',
  styleUrls: ['./finished-stage.component.css']
})
export class FinishedStageComponent implements OnInit {

  @Input() finishedStage!: IStage;

  constructor() { }

  ngOnInit(): void {
    console.log(this.finishedStage)
  }


}
