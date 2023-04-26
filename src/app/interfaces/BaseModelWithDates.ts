import type {BaseModel} from "./BaseModel";

export interface BaseModelWithDates extends BaseModel {
  createdAt: string;
  updatedAt: string;
}
