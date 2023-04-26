export interface AddCommentDto {

  title?: string;
  message: string;

  newsId: number;

  parentCommentId?: number;

}
