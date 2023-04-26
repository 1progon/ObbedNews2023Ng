import {BaseModel} from "./BaseModel";
import {Category} from "./Category";

export interface ParentCategory extends BaseModel {
  categories: Category[];
}
