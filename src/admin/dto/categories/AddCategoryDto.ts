import {BaseModelDto} from "../../../app/dto/BaseModelDto";

export interface AddCategoryDto extends BaseModelDto {
  parentCategoryId?: number;
}
