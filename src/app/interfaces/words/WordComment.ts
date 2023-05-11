import {Word} from "./Word";
import {User} from "../User";
import {CommentStatus} from "../../enums/news/comments/CommentStatus";

export interface WordComment {
  id: number;

  title?: string;
  message: string;

  likes: number;
  dislikes: number;

  word: Word;
  wordId: number;

  parentComment?: WordComment;
  parentCommentId?: number;

  childComments: WordComment[];


  user: User;
  userId: number;

  status: CommentStatus;
}
