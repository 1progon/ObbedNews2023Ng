import {TagDto} from "./TagDto";
import {BaseModelDto} from "../BaseModelDto";

export interface UpdateNewsDto extends BaseModelDto {

  id: number;
  categoryId: number;

  mainImage?: File;

  description?: string;
  article?: string;

  newsLink?: string;

  popular: boolean;

  tags?: TagDto[];

  removeImage: boolean;

  likes: number;
  disLikes: number;
}
