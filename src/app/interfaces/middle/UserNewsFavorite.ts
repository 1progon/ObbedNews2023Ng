import {User} from "../User";
import {News} from "../News";

export interface UserNewsFavorite {
  user: User;
  userId: number;

  news: News;
  newsId: number;
}
