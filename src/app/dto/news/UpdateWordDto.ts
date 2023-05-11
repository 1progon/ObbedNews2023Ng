import {TagDto} from "./TagDto";
import {BaseModelDto} from "../BaseModelDto";
import {WordSection} from "../../interfaces/words/dictionary/WordSection";

export interface UpdateWordDto extends BaseModelDto {

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

  wordSection?: WordSection;
}
