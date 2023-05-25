import {DefinitionLabel} from "./DefinitionLevel";

export interface DefinitionExample {
  example: string;
  exampleTranslation: string;
  labels?: DefinitionLabel[];
}
