import {Component, Input} from '@angular/core';
import {AdminWordsWrapperService} from "../../admin-words-wrapper.service";
import {ControlContainer, NgForm} from "@angular/forms";
import {SpeechPartSection} from "../../../../../app/interfaces/words/dictionary/SpeechPartSection";
import {WordSound} from "../../../../../app/interfaces/words/dictionary/WordSound";

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class SoundsComponent {
  @Input() section: SpeechPartSection = {} as SpeechPartSection;

  sectionBlockShow: boolean[] = [];

  protected readonly Number = Number;

  constructor(public ws: AdminWordsWrapperService) {
  }

  addSoundInSpeechPart(sp: SpeechPartSection) {
    if (!sp.sounds) sp.sounds = [];
    sp.sounds.push({} as WordSound);
  }

  removeSound(index: number) {
    this.section.sounds?.splice(index, 1);
    if (!this.section.sounds?.length) {
      this.section.sounds = undefined;
    }
  }
}
