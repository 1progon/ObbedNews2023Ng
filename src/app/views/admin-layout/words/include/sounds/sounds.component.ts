import {Component, Input} from '@angular/core';
import {EngLevel} from "../../../../../enums/news/EngLevel";
import {SpeechPartSection} from "../../../../../interfaces/words/dictionary/SpeechPartSection";
import {WordSound} from "../../../../../interfaces/words/dictionary/WordSound";

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss']
})
export class SoundsComponent {
  @Input() section: SpeechPartSection = {} as SpeechPartSection;

  protected readonly Number = Number;

  constructor() {
  }

  addSoundInSpeechPart(sp: SpeechPartSection) {
    if (!sp.sounds) sp.sounds = [];
    sp.sounds.push({} as WordSound);
  }
}
