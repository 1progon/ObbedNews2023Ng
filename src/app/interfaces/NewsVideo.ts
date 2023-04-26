import {News} from "./News";
import {NewsVideoSection} from "./NewsVideoSection";

export interface NewsVideo {
  id: number;
  name: string;

  createdAt: string;
  updatedAt: string;

  sortNumber: number;
  mainThumb?: string;

  folder?: string;
  filename?: string;

  filePath?: string;

  remoteUrl?: string;

  description?: string;

  news: News;
  newsId: number;

  section: NewsVideoSection;
  sectionId: number;

  isFree: boolean;
}
