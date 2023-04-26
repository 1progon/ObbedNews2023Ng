import {NewsVideo} from "./NewsVideo";
import {News} from "./News";

export interface NewsVideoSection {
  id: number;

  name: string;

  description?: string;
  icon?: string;
  sortNumber: number;

  videos: NewsVideo[];

  news: News;
  newsId: number;

  isFree: boolean;
}
