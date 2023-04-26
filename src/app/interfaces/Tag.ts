import type {BaseModel} from "./BaseModel";
import type {News} from "./News";

export interface Tag extends BaseModel {
  newsList?: News[];
}
