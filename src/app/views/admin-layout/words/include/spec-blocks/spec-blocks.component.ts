import {Component, Input} from '@angular/core';
import {SpeechPartSection} from "../../../../../interfaces/words/dictionary/SpeechPartSection";
import {SpecialDefinitionBlock} from "../../../../../interfaces/words/dictionary/SpecialDefinitionBlock";
import {AdminWordsWrapperService} from "../../admin-words-wrapper.service";
import {Definition} from "../../../../../interfaces/words/dictionary/Definition";

@Component({
  selector: 'app-spec-blocks',
  templateUrl: './spec-blocks.component.html',
  styleUrls: ['./spec-blocks.component.scss']
})
export class SpecBlocksComponent {
  @Input() section: SpeechPartSection = <SpeechPartSection>{};

  protected readonly Number = Number;
  specBlockShow: boolean[] = [];

  constructor(public ws: AdminWordsWrapperService) {
  }

  addSpecBlockInSpeechPart(sp: SpeechPartSection) {
    if (!sp.specBlocks) sp.specBlocks = [];

    this.sortSpecBlock(sp.specBlocks);

    let order = sp.specBlocks.length
      ? sp.specBlocks[sp.specBlocks.length - 1].sectionOrder + 1
      : sp.specBlocks.length + 1;

    sp.specBlocks.push({sectionOrder: order, definition: {} as Definition} as SpecialDefinitionBlock);
  }

  sortSpecBlock(specBlocks: SpecialDefinitionBlock[]) {
    specBlocks.sort((a, b) => a.sectionOrder - b.sectionOrder)
      .map((value, index) => {
        value.sectionOrder = index + 1;
        return value;
      });
  }
}
