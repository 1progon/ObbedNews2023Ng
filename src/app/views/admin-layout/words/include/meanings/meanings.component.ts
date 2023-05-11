import {Component, Input} from '@angular/core';
import {SpeechPartSection} from "../../../../../interfaces/words/dictionary/SpeechPartSection";
import {Meaning} from "../../../../../interfaces/words/dictionary/Meaning";

@Component({
  selector: 'app-meanings',
  templateUrl: './meanings.component.html',
  styleUrls: ['./meanings.component.scss']
})
export class MeaningsComponent {
  @Input() section: SpeechPartSection = {} as SpeechPartSection;

  protected readonly Number = Number;

  constructor() {
  }

  addMeaningInSpeechPart(sp: SpeechPartSection) {
    if (!sp.meanings) sp.meanings = [];
    sp.meanings.push({} as Meaning);
  }
}
