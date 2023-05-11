import type {User} from "../User";
import {LikeType} from "../../enums/news/LikeType";
import {Word} from "../words/Word";

export interface UserWordLike {
  user: User;
  userId: number;

  word: Word;
  wordId: number;

  likeType: LikeType;
}
