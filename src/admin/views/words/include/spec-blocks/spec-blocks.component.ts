import {Component, Input} from '@angular/core';
import {AdminWordsWrapperService} from "../../admin-words-wrapper.service";
import {ControlContainer, NgForm} from "@angular/forms";
import {SpeechPartSection} from "../../../../../app/interfaces/words/dictionary/SpeechPartSection";
import {Definition} from "../../../../../app/interfaces/words/dictionary/Definition";
import {SpecialDefinitionBlock} from "../../../../../app/interfaces/words/dictionary/SpecialDefinitionBlock";

@Component({
  selector: 'app-spec-blocks',
  templateUrl: './spec-blocks.component.html',
  styleUrls: ['./spec-blocks.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
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

  sortSpecBlock(specBlocks?: SpecialDefinitionBlock[]) {
    specBlocks?.sort((a, b) => a.sectionOrder - b.sectionOrder)
      .map((value, index) => {
        value.sectionOrder = index + 1;
        return value;
      });
  }

  removeSpecBlock(index: number) {
    this.section.specBlocks?.splice(index, 1);
    if (!this.section.specBlocks?.length) {
      this.section.specBlocks = undefined;
    }
  }
}
