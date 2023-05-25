import {DefinitionLabel} from "./DefinitionLevel";
import {DefinitionExample} from "./DefinitionExample";
import {EngLevel} from "../../../enums/news/EngLevel";

export interface Definition {
  defText: string;
  level?: EngLevel;
  labels?: DefinitionLabel[];
  examples?: DefinitionExample[];

  orderInsideMeaning?: number;
  sectionOrder: number;

}
