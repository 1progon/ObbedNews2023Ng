import {User} from "../User";
import {Word} from "../words/Word";

export interface UserWordFavorite {
  user: User;
  userId: number;

  word: Word;
  wordId: number;
}
