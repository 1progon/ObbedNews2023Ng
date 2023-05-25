import {CommentStatus} from "../../enums/news/comments/CommentStatus";

export interface AddedCommentDto {
  commentId: number;
  status: CommentStatus;

  message: string;
  title?: string;

  parentCommentId?: number;
}
