import {IStageAnswered} from "./IStageAnswered";

export interface IProcessAnswered{
  id: number,
  name: string,
  finishedStages: IStageAnswered[],
  date: Date
}
