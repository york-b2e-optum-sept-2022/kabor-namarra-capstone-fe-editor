import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProcessService} from "../../process.service";
import {IProcess} from "../../interfaces/IProcess";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit, OnDestroy {

  processList!: IProcess[];
  onDestroy = new Subject();


  constructor(public processService: ProcessService) {
    this.processService.$processList.pipe(takeUntil(this.onDestroy)).subscribe( processList => {
      this.processList = processList;
      console.log(processList)
    })
  }

  ngOnInit(): void {
    this.processService.getProcessList()
  }
  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

}
