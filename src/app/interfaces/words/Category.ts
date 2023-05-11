import {ParentCategory} from "./ParentCategory";
import {Word} from "./Word";
import {BaseModel} from "../BaseModel";

export interface Category extends BaseModel {
  parentCategory?: ParentCategory;
  parentCategoryId?: number;

  wordList: Word[];
}
