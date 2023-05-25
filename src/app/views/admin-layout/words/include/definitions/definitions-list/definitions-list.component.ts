import {Component, Input} from '@angular/core';
import {SpeechPartSection} from "../../../../../../interfaces/words/dictionary/SpeechPartSection";
import {Meaning} from "../../../../../../interfaces/words/dictionary/Meaning";
import {Definition} from "../../../../../../interfaces/words/dictionary/Definition";
import {AdminWordsWrapperService} from "../../../admin-words-wrapper.service";
import {ControlContainer, NgForm} from "@angular/forms";

@Component({
  selector: 'app-definitions-list',
  templateUrl: './definitions-list.component.html',
  styleUrls: ['./definitions-list.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class DefinitionsListComponent {
  @Input() section: SpeechPartSection | Meaning = {} as SpeechPartSection | Meaning;

  protected readonly Number = Number;

  constructor(public ws: AdminWordsWrapperService) {
  }

  addDefinition(sp: Meaning | SpeechPartSection) {
    if (!sp.definitions) sp.definitions = [];

    this.sortDefinitions(sp.definitions);

    let order = sp.definitions.length
      ? sp.definitions[sp.definitions.length - 1].sectionOrder + 1
      : sp.definitions.length + 1;


    sp.definitions.push({sectionOrder: order} as Definition);
  }


  sortDefinitions(definitions?: Definition[]) {
    definitions?.sort((a, b) => a.sectionOrder - b.sectionOrder)
      .map((value, i) => {
        value.sectionOrder = i + 1;
        return value;
      });
  }
}
