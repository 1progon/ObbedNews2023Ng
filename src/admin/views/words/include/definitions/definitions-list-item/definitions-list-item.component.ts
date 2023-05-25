import {Component, Input} from '@angular/core';
import {AdminWordsWrapperService} from "../../../admin-words-wrapper.service";
import {ControlContainer, NgForm} from "@angular/forms";
import {Definition} from "../../../../../../app/interfaces/words/dictionary/Definition";
import {SpeechPartSection} from "../../../../../../app/interfaces/words/dictionary/SpeechPartSection";
import {Meaning} from "../../../../../../app/interfaces/words/dictionary/Meaning";
import {LabelType} from "../../../../../../app/interfaces/words/dictionary/LabelType";
import {EngLevel} from "../../../../../../app/enums/news/EngLevel";
import {SpeechPartEnum} from "../../../../../../app/enums/news/SpeechPartEnum";
import {DefinitionExample} from "../../../../../../app/interfaces/words/dictionary/DefinitionExample";
import {DefinitionLabel} from "../../../../../../app/interfaces/words/dictionary/DefinitionLevel";

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
    definition.labels.push({speechPartEnum: undefined} as DefinitionLabel);
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
    if (!this.definition.examples?.length) {
      this.definition.examples = undefined;
    }
  }
}
