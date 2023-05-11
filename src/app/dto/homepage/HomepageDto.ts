import {Word} from "../../interfaces/words/Word";

export interface HomepageDto {
  popular?: Word[];
  mostCommented?: Word[];
  last?: Word[];
}
