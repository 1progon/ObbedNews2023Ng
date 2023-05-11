import {Component, Input} from '@angular/core';
import {Definition} from "../../../../../../interfaces/words/dictionary/Definition";
import {EngLevel} from "../../../../../../enums/news/EngLevel";
import {DefinitionExample} from "../../../../../../interfaces/words/dictionary/DefinitionExample";
import {DefinitionLabel} from "../../../../../../interfaces/words/dictionary/DefinitionLevel";
import {SpeechPartEnum} from "../../../../../../enums/news/SpeechPartEnum";

@Component({
  selector: 'app-definitions-list-item',
  templateUrl: './definitions-list-item.component.html',
  styleUrls: ['./definitions-list-item.component.scss']
})
export class DefinitionsListItemComponent {
  @Input() definition: Definition = <Definition>{}
  @Input() index: number = 0;

  protected readonly Number = Number;
  protected readonly EngLevel = EngLevel;
  protected readonly SpeechPartEnum = SpeechPartEnum;

  constructor() {
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
