import {IStageCreating} from "./IStageCreating";

export interface IProcessCreating{
  id?: number,
  name: string,
  stages: IStageCreating[]
}
