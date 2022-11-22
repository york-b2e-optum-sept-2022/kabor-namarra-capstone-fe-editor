import {Component, Input, OnInit} from '@angular/core';
import {IProcess} from "../../interfaces/IProcess";
import {ProcessService} from "../../process.service";
import {IProcessAnswered} from "../../interfaces/IProcessAnswered";

@Component({
  selector: 'app-finished-process-display',
  templateUrl: './finished-process-display.component.html',
  styleUrls: ['./finished-process-display.component.css']
})
export class FinishedProcessDisplayComponent implements OnInit {

  @Input() finishedProcess!: IProcess;

  constructor(public processService: ProcessService) { }

  ngOnInit(): void {
  }

  onProcessClick(){
    this.processService.onFinishedProcessClick(this.finishedProcess)
  }

}
