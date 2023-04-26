import {BaseModelDto} from "../BaseModelDto";
import {TagDto} from "./TagDto";

export interface AddNewsDto extends BaseModelDto {

  categoryId: number;

  mainImage?: File;

  description?: string;
  article?: string;

  newsLink?: string;

  popular: boolean;


  tags?: TagDto[];

  likes: number;
  disLikes: number;

}
