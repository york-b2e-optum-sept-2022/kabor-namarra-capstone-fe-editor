import { Component } from '@angular/core';
import {ProcessService} from "./process.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kabor-namarra-capstone-fe-editor';

  creatingProcess: boolean = false;

  constructor(public processService: ProcessService) {
    this.processService.$creatingProcess.subscribe(creatingProcess => {
      this.creatingProcess = creatingProcess;
    })
  }

}
