import {LikeType} from "../../enums/news/LikeType";

export interface PostUpdateLikeDto {
  type: LikeType;
  wordId: number;
}
