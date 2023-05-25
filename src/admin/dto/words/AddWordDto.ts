import {BaseModelDto} from "../../../app/dto/BaseModelDto";
import {TagDto} from "../../../app/dto/words/TagDto";
import {WordSection} from "../../../app/interfaces/words/dictionary/WordSection";

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
