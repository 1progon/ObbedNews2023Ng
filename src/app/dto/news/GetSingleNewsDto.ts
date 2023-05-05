import {News} from "../../interfaces/News";

export interface GetSingleNewsDto {
  news: News;
  nearbyNews: News[];
}
