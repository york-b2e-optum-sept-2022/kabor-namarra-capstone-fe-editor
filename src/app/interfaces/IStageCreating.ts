import {STAGE_TYPES} from "../enums/STAGE_TYPES";

export interface IStageCreating{
  id?: number,
  choiceText?: string[],
  stage_type?: STAGE_TYPES,
  stageOrder?: number,
  question?: string
}
