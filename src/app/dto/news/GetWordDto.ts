import {Word} from "../../interfaces/words/Word";

export interface GetWordDto {
  word: Word;
  nearbyWords: Word[];
}
