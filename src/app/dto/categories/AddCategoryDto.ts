import {BaseModelDto} from "../BaseModelDto";

export interface AddCategoryDto extends BaseModelDto {
  parentCategoryId?: number;
}
