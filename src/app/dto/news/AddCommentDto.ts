export interface AddCommentDto {

  title?: string;
  message: string;

  wordId: number;

  parentCommentId?: number;

}
