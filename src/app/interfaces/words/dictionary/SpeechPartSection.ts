import {WordSound} from "./WordSound";
import {Meaning} from "./Meaning";
import {Definition} from "./Definition";
import {SpecialDefinitionBlock} from "./SpecialDefinitionBlock";
import {SpeechPartEnum} from "../../../enums/news/SpeechPartEnum";

export interface SpeechPartSection {
  order: number;
  speechPartEnum: SpeechPartEnum;
  sounds: WordSound[];
  meanings: Meaning[];
  definitions: Definition[];
  specBlocks: SpecialDefinitionBlock[];
}
