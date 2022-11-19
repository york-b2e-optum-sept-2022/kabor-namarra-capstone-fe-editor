import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProcess} from "./interfaces/IProcess";
import {IStage} from "./interfaces/IStage";
import {IProcessCreating} from "./interfaces/IProcessCreating";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public httpClient: HttpClient) { }

  getProcessList(){
    return this.httpClient.get("http://localhost:8080/api/process")as Observable<IProcessCreating[]>
  }

  getProcessStages(processId: number){
    console.log(processId)
    return this.httpClient.get(`http://localhost:8080/api/stage?processId=${processId}`)as Observable<IStage[]>
  }

  onSaveProcessClient(process: IProcessCreating){
    return this.httpClient.post("http://localhost:8080/api/process", {name:process.name, stages: process.stages})as Observable<IProcess>
  }
}
