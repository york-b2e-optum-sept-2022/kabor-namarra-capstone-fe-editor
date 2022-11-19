import {Component, Input, OnInit} from '@angular/core';
import {IProcess} from "../../interfaces/IProcess";
import {ProcessService} from "../../process.service";

@Component({
  selector: 'app-process-display',
  templateUrl: './process-display.component.html',
  styleUrls: ['./process-display.component.css']
})
export class ProcessDisplayComponent implements OnInit {

  @Input() process!: IProcess;

  constructor(public processService: ProcessService) { }

  ngOnInit(): void {
  }

  onProcessClick(){
    this.processService.onProcessClick(this.process)
  }

}
