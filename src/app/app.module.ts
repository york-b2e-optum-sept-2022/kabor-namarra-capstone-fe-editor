import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateProcessComponent } from './components/create-process/create-process.component';
import { ProcessDashboardComponent } from './components/process-dashboard/process-dashboard.component';
import { ProcessListComponent } from './components/process-list/process-list.component';
import { ProcessComponent } from './components/process/process.component';
import { ProcessDisplayComponent } from './components/process-display/process-display.component';
import { StageListComponent } from './components/stage-list/stage-list.component';
import { StageComponent } from './components/stage/stage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import { CreateStageComponent } from './components/create-stage/create-stage.component';
import {FormsModule} from "@angular/forms";
import { StageChoicesComponent } from './components/stage-choices/stage-choices.component';
import { EditCreatingStageComponent } from './components/edit-creating-stage/edit-creating-stage.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateProcessComponent,
    ProcessDashboardComponent,
    ProcessListComponent,
    ProcessComponent,
    ProcessDisplayComponent,
    StageListComponent,
    StageComponent,
    CreateStageComponent,
    StageChoicesComponent,
    EditCreatingStageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
