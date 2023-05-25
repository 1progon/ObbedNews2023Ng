import {BaseModelDto} from "../../../app/dto/BaseModelDto";
import {TagDto} from "../../../app/dto/words/TagDto";
import {WordSection} from "../../../app/interfaces/words/dictionary/WordSection";

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

  isDraft: boolean;
}
