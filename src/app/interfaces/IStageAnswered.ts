import {STAGE_TYPES} from "../enums/STAGE_TYPES";

export interface IStageAnswered{
  id?: number,
  choiceText: string[],
  response: string[],
  stage_type?: STAGE_TYPES,
  stageOrder?: number,
  question: string
}
