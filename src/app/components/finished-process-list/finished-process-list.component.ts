import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProcessAnswered} from "../../interfaces/IProcessAnswered";
import {Subject, takeUntil} from "rxjs";
import {ProcessService} from "../../process.service";
import {IProcess} from "../../interfaces/IProcess";

@Component({
  selector: 'app-finished-process-list',
  templateUrl: './finished-process-list.component.html',
  styleUrls: ['./finished-process-list.component.css']
})
export class FinishedProcessListComponent implements OnInit, OnDestroy {

  finishedProcessList!: IProcess[];
  viewingFinishedProcess: boolean = false;
  onDestroy = new Subject();

  constructor(public processService: ProcessService) {
    this.processService.$viewingFinishedProcess.pipe(takeUntil(this.onDestroy)).subscribe( viewing => {
      this.viewingFinishedProcess = viewing;
    })
    this.processService.$finishedProcessList.pipe(takeUntil(this.onDestroy)).subscribe( finishedProcessList => {
      this.finishedProcessList = finishedProcessList;
    })
  }

  ngOnInit(): void {
    this.processService.getFinishedProcesses();
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
  onExitFinishedClick(){
    this.processService.onViewFinished();
  }

  onBackClick(){
    this.processService.onViewingFinishedProcess();
  }

}
