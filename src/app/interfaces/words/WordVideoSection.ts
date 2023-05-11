import {Word} from "./Word";
import {WordVideo} from "./WordVideo";

export interface WordVideoSection {
  id: number;

  name: string;

  description?: string;
  icon?: string;
  sortNumber: number;

  videos: WordVideo[];

  word: Word;
  wordId: number;

  isFree: boolean;
}
