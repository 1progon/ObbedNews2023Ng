import {BaseModelDto} from "../BaseModelDto";
import {TagDto} from "./TagDto";
import {WordSection} from "../../interfaces/words/dictionary/WordSection";

export interface AddWordDto extends BaseModelDto {

  categoryId: number;

  mainImage?: File;

  description?: string;
  article?: string;

  newsLink?: string;

  popular: boolean;


  tags?: TagDto[];

  likes: number;
  disLikes: number;

  wordSection?: WordSection;

  isDraft: boolean;

}
