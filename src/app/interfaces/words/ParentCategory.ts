import {Category} from "./Category";
import {BaseModel} from "../BaseModel";

export interface ParentCategory extends BaseModel {
  categories: Category[];
}
