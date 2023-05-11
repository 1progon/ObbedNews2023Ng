import type {BaseModel} from "./BaseModel";
import {Word} from "./words/Word";

export interface Tag extends BaseModel {
  wordList?: Word[];
}
