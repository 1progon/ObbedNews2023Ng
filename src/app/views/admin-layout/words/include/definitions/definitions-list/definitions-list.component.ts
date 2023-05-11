import {Component, Input} from '@angular/core';
import {SpeechPartSection} from "../../../../../../interfaces/words/dictionary/SpeechPartSection";
import {Meaning} from "../../../../../../interfaces/words/dictionary/Meaning";
import {Definition} from "../../../../../../interfaces/words/dictionary/Definition";

@Component({
  selector: 'app-definitions-list',
  templateUrl: './definitions-list.component.html',
  styleUrls: ['./definitions-list.component.scss']
})
export class DefinitionsListComponent {
  @Input() section: SpeechPartSection | Meaning = {} as SpeechPartSection | Meaning;

  protected readonly Number = Number;

  constructor() {
  }

  addDefinition(section: Meaning | SpeechPartSection) {
    if (!section.definitions) section.definitions = [];
    section.definitions.push({} as Definition);
  }


}
