import {Component, Input} from '@angular/core';
import {Definition} from "../../../../../../interfaces/words/dictionary/Definition";
import {EngLevel} from "../../../../../../enums/news/EngLevel";
import {DefinitionExample} from "../../../../../../interfaces/words/dictionary/DefinitionExample";
import {DefinitionLabel} from "../../../../../../interfaces/words/dictionary/DefinitionLevel";
import {SpeechPartEnum} from "../../../../../../enums/news/SpeechPartEnum";
import {SpeechPartSection} from "../../../../../../interfaces/words/dictionary/SpeechPartSection";
import {Meaning} from "../../../../../../interfaces/words/dictionary/Meaning";
import {AdminWordsWrapperService} from "../../../admin-words-wrapper.service";

@Component({
  selector: 'app-definitions-list-item',
  templateUrl: './definitions-list-item.component.html',
  styleUrls: ['./definitions-list-item.component.scss']
})
export class DefinitionsListItemComponent {
  @Input() definition: Definition = <Definition>{}
  @Input() section: SpeechPartSection | Meaning = <SpeechPartSection | Meaning>{}
  @Input() index: number = 0;

  showSection: boolean[] = [];

  protected readonly Number = Number;
  protected readonly EngLevel = EngLevel;
  protected readonly SpeechPartEnum = SpeechPartEnum;

  constructor(public ws: AdminWordsWrapperService) {
  }

  addExampleInDefinition(definition: Definition) {
    if (!definition.examples) definition.examples = [];
    definition.examples.push({} as DefinitionExample);
  }

  addLabelsInDefinition(definition: Definition) {
    if (!definition.labels) definition.labels = [];
    definition.labels.push({} as DefinitionLabel);
  }

}
