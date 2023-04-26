import {News} from "../../interfaces/News";

export interface HomepageDto {
  popular?: News[];
  mostCommented?: News[];
  last?: News[];
}
