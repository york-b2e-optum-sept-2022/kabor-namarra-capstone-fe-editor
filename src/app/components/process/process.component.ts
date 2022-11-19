import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProcessService} from "../../process.service";
import {IProcess} from "../../interfaces/IProcess";
import {IStage} from "../../interfaces/IStage";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit, OnDestroy {

  process!: IProcess;
  onDestroy = new Subject();


  constructor(public processService: ProcessService) {
    this.processService.$process.pipe(takeUntil(this.onDestroy)).subscribe( process => {
      this.process = process;
    })
  }

  ngOnInit(): void {
    this.processService.getProcess();
  }
  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
  onBackClick(){
    this.processService.onStopViewing();
  }

}
