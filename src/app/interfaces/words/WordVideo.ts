import {Word} from "./Word";
import {WordVideoSection} from "./WordVideoSection";

export interface WordVideo {
  id: number;
  name: string;

  createdAt: string;
  updatedAt: string;

  sortNumber: number;
  mainThumb?: string;

  folder?: string;
  filename?: string;

  filePath?: string;

  remoteUrl?: string;

  description?: string;

  word: Word;
  wordId: number;

  section: WordVideoSection;
  sectionId: number;

  isFree: boolean;
}
