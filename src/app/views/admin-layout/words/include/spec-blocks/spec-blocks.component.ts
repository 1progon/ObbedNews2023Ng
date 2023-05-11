import {Component, Input} from '@angular/core';
import {EngLevel} from "../../../../../enums/news/EngLevel";
import {SpeechPartSection} from "../../../../../interfaces/words/dictionary/SpeechPartSection";
import {SpecialDefinitionBlock} from "../../../../../interfaces/words/dictionary/SpecialDefinitionBlock";

@Component({
  selector: 'app-spec-blocks',
  templateUrl: './spec-blocks.component.html',
  styleUrls: ['./spec-blocks.component.scss']
})
export class SpecBlocksComponent {
  @Input() section: SpeechPartSection = <SpeechPartSection>{};

  protected readonly Number = Number;

  constructor() {
  }

  addSpecBlockInSpeechPart(sp: SpeechPartSection) {
    if (!sp.specBlocks) sp.specBlocks = [];
    sp.specBlocks.push({} as SpecialDefinitionBlock);
  }
}
