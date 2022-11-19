import {IStage} from "./IStage";

export interface IProcess{
  id?: number,
  name: string,
  stages: IStage[]
}
