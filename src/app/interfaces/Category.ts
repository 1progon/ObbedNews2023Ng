import {News} from "./News";
import {ParentCategory} from "./ParentCategory";
import {BaseModel} from "./BaseModel";

export interface Category extends BaseModel {
  parentCategory?: ParentCategory;
  parentCategoryId?: number;

  newsList: News[];
}
