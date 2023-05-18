import {Component, Input} from '@angular/core';
import {SpeechPartSection} from "../../../../../interfaces/words/dictionary/SpeechPartSection";
import {Meaning} from "../../../../../interfaces/words/dictionary/Meaning";
import {AdminWordsWrapperService} from "../../admin-words-wrapper.service";
import {ControlContainer, NgForm} from "@angular/forms";

@Component({
  selector: 'app-meanings',
  templateUrl: './meanings.component.html',
  styleUrls: ['./meanings.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class MeaningsComponent {
  @Input() section: SpeechPartSection = {} as SpeechPartSection;

  protected readonly Number = Number;
  showSection: boolean[] = [];

  constructor(public ws: AdminWordsWrapperService) {
  }

  addMeaningInSpeechPart(sp: SpeechPartSection) {
    if (!sp.meanings) sp.meanings = [];

    this.sortMeanings(sp.meanings);

    let order = sp.meanings.length
      ? sp.meanings[sp.meanings.length - 1].sectionOrder + 1
      : sp.meanings.length + 1;

    sp.meanings.push({sectionOrder: order} as Meaning);

  }

  sortMeanings(meanings: Meaning[]) {
    meanings
      .sort((a, b) => a.sectionOrder - b.sectionOrder)
      .map((value, i) => {
        value.sectionOrder = i + 1;
        return value;
      });
  }
}
