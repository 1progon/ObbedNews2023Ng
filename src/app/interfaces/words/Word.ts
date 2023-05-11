import {WordVideoSection} from "./WordVideoSection";
import {BaseModelWithDates} from "../BaseModelWithDates";
import {Tag} from "../Tag";
import {UserWordLike} from "../middle/UserWordLike";
import {UserWordFavorite} from "../middle/UserWordFavorite";
import {WordComment} from "./WordComment";
import {Category} from "./Category";
import {WordSection} from "./dictionary/WordSection";

export interface Word extends BaseModelWithDates {


  mainThumb?: string;
  mainImage?: string;

  description?: string;
  article?: string;

  newsLink?: string;

  dislikesCount: number;
  likesCount: number;

  likesRate: number;

  popular: boolean;

  comments: WordComment[];
  tags?: Tag[];

  userWordLikes: UserWordLike[];

  userWordFavorites: UserWordFavorite[];

  category: Category;
  categoryId: number;

  videoSections: WordVideoSection[];

  isFree: boolean;

  wordSection?: WordSection;


}
