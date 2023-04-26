import type {News} from "./News";
import type {User} from "./User";
import {CommentStatus} from "../enums/news/comments/CommentStatus";

export interface Comment {
  id: number;

  title?: string;
  message: string;

  likes: number;
  dislikes: number;

  news: News;
  newsId: number;

  parentComment?: Comment;
  parentCommentId?: number;

  childComments: Comment[];


  user: User;
  userId: number;

  status: CommentStatus;
}
