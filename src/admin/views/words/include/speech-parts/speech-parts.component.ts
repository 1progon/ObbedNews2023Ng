import {Component, Input} from '@angular/core';
import {AdminWordsWrapperService} from "../../admin-words-wrapper.service";
import {ControlContainer, NgForm} from "@angular/forms";
import {WordSection} from "../../../../../app/interfaces/words/dictionary/WordSection";
import {SpeechPartEnum} from "../../../../../app/enums/news/SpeechPartEnum";
import {SpeechPartSection} from "../../../../../app/interfaces/words/dictionary/SpeechPartSection";

@Component({
  selector: 'app-speech-parts',
  templateUrl: './speech-parts.component.html',
  styleUrls: ['./speech-parts.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class SpeechPartsComponent {
  @Input() wordSection: WordSection = {} as WordSection;

  showSection: boolean[] = [];

  protected readonly SpeechPartEnum = SpeechPartEnum;
  protected readonly Number = Number;

  constructor(public ws: AdminWordsWrapperService) {
  }


  addSpeechPart() {
    if (!this.wordSection.speechParts) this.wordSection.speechParts = [];

    this.sortSpeechParts(this.wordSection.speechParts);
    let order = this.wordSection.speechParts.length
      ? this.wordSection.speechParts[this.wordSection.speechParts.length - 1].order + 1
      : this.wordSection.speechParts.length + 1;


    this.wordSection.speechParts.push({order, speechPartEnum: SpeechPartEnum.Undefined} as SpeechPartSection);
  }

  removeSpeechPart(indexElement: number) {
    this.wordSection.speechParts?.splice(indexElement, 1);
    if (!this.wordSection.speechParts?.length) {
      this.wordSection.speechParts = undefined;
    }
  }


  sortSpeechParts(speechParts?: SpeechPartSection[]) {
    speechParts?.sort((a, b) => a.order - b.order)
      .map((value, index) => {
        value.order = index + 1;
        return value;
      })
  }


}
