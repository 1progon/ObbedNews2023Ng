import {Component, Input} from '@angular/core';
import {SpeechPartEnum} from "../../../../../enums/news/SpeechPartEnum";
import {WordSection} from "../../../../../interfaces/words/dictionary/WordSection";
import {SpeechPartSection} from "../../../../../interfaces/words/dictionary/SpeechPartSection";

@Component({
  selector: 'app-speech-parts',
  templateUrl: './speech-parts.component.html',
  styleUrls: ['./speech-parts.component.scss']
})
export class SpeechPartsComponent {
  @Input() wordSection: WordSection = {} as WordSection;

  protected readonly SpeechPartEnum = SpeechPartEnum;
  protected readonly Number = Number;

  constructor() {
  }


  addSpeechPart() {
    if (!this.wordSection.speechParts) this.wordSection.speechParts = [];
    this.wordSection.speechParts.push({} as SpeechPartSection);
  }

  removeSpeechPart(indexElement: number) {
    this.wordSection.speechParts.splice(indexElement, 1)
  }


}
