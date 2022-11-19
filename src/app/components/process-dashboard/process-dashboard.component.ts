import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProcessService} from "../../process.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-process-dashboard',
  templateUrl: './process-dashboard.component.html',
  styleUrls: ['./process-dashboard.component.css']
})
export class ProcessDashboardComponent implements OnInit, OnDestroy {

  viewingProcess: boolean = false;
  onDestroy = new Subject();

  constructor(public processService: ProcessService) {
    this.processService.$viewingProcess.pipe(takeUntil(this.onDestroy)).subscribe( viewingProcess => {
      this.viewingProcess = viewingProcess;
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onCreateClick(){
    this.processService.onCreatingProcess();
  }

}
