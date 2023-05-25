import {Component, Input} from '@angular/core';
import {Definition} from "../../../../../../interfaces/words/dictionary/Definition";
import {EngLevel} from "../../../../../../enums/news/EngLevel";
import {DefinitionExample} from "../../../../../../interfaces/words/dictionary/DefinitionExample";
import {DefinitionLabel} from "../../../../../../interfaces/words/dictionary/DefinitionLevel";
import {SpeechPartEnum} from "../../../../../../enums/news/SpeechPartEnum";
import {SpeechPartSection} from "../../../../../../interfaces/words/dictionary/SpeechPartSection";
import {Meaning} from "../../../../../../interfaces/words/dictionary/Meaning";
import {AdminWordsWrapperService} from "../../../admin-words-wrapper.service";
import {ControlContainer, NgForm} from "@angular/forms";
import {LabelType} from "../../../../../../interfaces/words/dictionary/LabelType";

@Component({
  selector: 'app-definitions-list-item',
  templateUrl: './definitions-list-item.component.html',
  styleUrls: ['./definitions-list-item.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class DefinitionsListItemComponent {
  @Input() definition: Definition = <Definition>{}
  @Input() section: SpeechPartSection | Meaning = <SpeechPartSection | Meaning>{}
  @Input() index: number = 0;

  showSection: boolean[] = [];

  protected readonly Number = Number;
  protected readonly EngLevel = EngLevel;
  protected readonly SpeechPartEnum = SpeechPartEnum;
  tempLabel: LabelType[] = [];

  constructor(public ws: AdminWordsWrapperService) {
  }

  addExampleInDefinition(definition: Definition) {
    if (!definition.examples) definition.examples = [];
    definition.examples.push({} as DefinitionExample);
  }

  addLabelsInDefinition(definition: Definition) {
    if (!definition.labels) definition.labels = [];
    definition.labels.push({speechPartEnum: SpeechPartEnum.Undefined} as DefinitionLabel);
  }


  updateLabel(l: DefinitionLabel, index: number) {
    l.name = this.tempLabel[index].name;
    l.description = this.tempLabel[index].text;
  }

  removeDefinition(index: number) {
    this.section.definitions?.splice(index, 1);
    if (!this.section.definitions?.length) {
      this.section.definitions = undefined;
    }
  }

  removeLabels(index: number) {
    this.definition.labels?.splice(index, 1);
    if (!this.definition.labels?.length) {
      this.definition.labels = undefined;
    }
  }

  removeExamples(index: number) {
    this.definition.examples?.splice(index, 1);
    if (!this.definition.examples) {
      this.definition.examples = undefined;
    }
  }
}
