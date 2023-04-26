import type {News} from "../News";
import type {User} from "../User";
import {LikeType} from "../../enums/news/LikeType";

export interface UserNewsLike {
  user: User;
  userId: number;

  news: News;
  newsId: number;

  likeType: LikeType;
}
