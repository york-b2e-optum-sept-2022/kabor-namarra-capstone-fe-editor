import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProcessService} from "../../process.service";
import {Subject, takeUntil} from "rxjs";
import {IProcess} from "../../interfaces/IProcess";
import {IProcessAnswered} from "../../interfaces/IProcessAnswered";

@Component({
  selector: 'app-finished-process',
  templateUrl: './finished-process.component.html',
  styleUrls: ['./finished-process.component.css']
})
export class FinishedProcessComponent implements OnInit, OnDestroy {

  finishedProcess!: IProcess;
  onDestroy = new Subject();

  constructor(public processService: ProcessService) {
    this.processService.$finishedProcess.pipe(takeUntil(this.onDestroy)).subscribe( finishedProcess => {
      this.finishedProcess = finishedProcess;
      console.log(finishedProcess)
    })
  }

  ngOnInit(): void {
    this.processService.getFinishedProcess();
  }
  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

}
