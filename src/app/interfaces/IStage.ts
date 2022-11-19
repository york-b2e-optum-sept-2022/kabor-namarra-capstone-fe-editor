import {IProcess} from "./IProcess";
import {STAGE_TYPES} from "../enums/STAGE_TYPES";
import {IChoice} from "./IChoice";

export interface IStage{
  id?: number,
  choiceText: IChoice[],
  stage_type?: STAGE_TYPES,
  stageOrder?: number,
  question: string
}
