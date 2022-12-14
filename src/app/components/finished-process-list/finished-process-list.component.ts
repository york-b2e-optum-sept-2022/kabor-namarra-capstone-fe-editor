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
  searchText: string = "";
  sortAZ: boolean = true;

  constructor(public processService: ProcessService) {
    this.processService.$viewingFinishedProcess.pipe(takeUntil(this.onDestroy)).subscribe( viewing => {
      this.viewingFinishedProcess = viewing;
    })
    this.processService.$finishedProcessList.pipe(takeUntil(this.onDestroy)).subscribe( finishedProcessList => {
      this.finishedProcessList = finishedProcessList;
    })
    // this.processService.$finishedProcessList.pipe(takeUntil(this.onDestroy)).subscribe(sortedProcesses => {
    //   this.finishedProcessList = sortedProcesses;
    // })
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

  onSearchTextChange(text: string) {
    this.processService.onSearchTextChange(text);
  }

  sortAlphabetically(){
    this.sortAZ = false;
    this.finishedProcessList.sort(function(a, b) {
      let textA = a.name.toUpperCase();
      let textB = b.name.toUpperCase();
      return (textA > textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  reverseAlphabetically(){
    this.sortAZ = true;
    this.finishedProcessList.sort(function(a, b) {
      let textA = a.name.toUpperCase();
      let textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

}
