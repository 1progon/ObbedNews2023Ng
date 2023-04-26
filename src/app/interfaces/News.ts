import type {BaseModelWithDates} from "./BaseModelWithDates";
import type {Comment} from "./Comment";
import type {Tag} from "./Tag";
import type {UserNewsLike} from "./middle/UserNewsLike";
import {UserNewsFavorite} from "./middle/UserNewsFavorite";
import {Category} from "./Category";
import {NewsVideoSection} from "./NewsVideoSection";

export interface News extends BaseModelWithDates {


  mainThumb?: string;
  mainImage?: string;

  description?: string;
  article?: string;

  newsLink?: string;

  dislikesCount: number;
  likesCount: number;

  likesRate: number;

  popular: boolean;

  comments: Comment[];
  tags?: Tag[];

  userNewsLikes: UserNewsLike[];

  userNewsFavorites: UserNewsFavorite[];

  category: Category;
  categoryId: number;

  videoSections: NewsVideoSection[];

  isFree: boolean;


}
