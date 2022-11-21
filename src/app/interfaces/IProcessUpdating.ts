import {IStageCreating} from "./IStageCreating";

export interface IProcessUpdating{
  id?: number,
  name: string,
  stages: IStageCreating[]
  newStages?: IStageCreating[]
}
