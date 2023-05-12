import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map} from "rxjs";
import {AdminWordService} from "../../../services/admin/admin-word.service";
import {Word} from "../../../interfaces/words/Word";
import {SpeechPartSection} from "../../../interfaces/words/dictionary/SpeechPartSection";
import {Meaning} from "../../../interfaces/words/dictionary/Meaning";
import {SpecialDefinitionBlock} from "../../../interfaces/words/dictionary/SpecialDefinitionBlock";
import {Definition} from "../../../interfaces/words/dictionary/Definition";
import {WordSound} from "../../../interfaces/words/dictionary/WordSound";

@Injectable({
  providedIn: 'root'
})
export class AdminWordsWrapperService {
  word$: BehaviorSubject<Word> = new BehaviorSubject<Word>(<Word>{});

  activeSpeechPart?: SpeechPartSection;
  activeSection?: Meaning | SpecialDefinitionBlock | Definition | WordSound;
  activeSection2?: Meaning | SpecialDefinitionBlock | Definition | WordSound;

  constructor(private adminWordService: AdminWordService) {
  }


  getWord(newsId: number) {
    return this.adminWordService.getWordById(newsId)
      .pipe(
        catchError(err => {
          throw err;
        }),
        map(value => {
          this.word$.next(value);
          return value;
        }))


  }

  createSlugFromString(text: string) {
    // dictionary with ru letters to eng
    let dic: { [key: string]: string } = {
      'а': 'a',
      'б': 'b',
      'в': 'v',
      'г': 'g',
      'д': 'd',
      'е': 'e',
      'ё': 'yo',
      'ж': 'zh',
      'з': 'z',
      'и': 'i',
      'й': 'j',
      'к': 'k',
      'л': 'l',
      'м': 'm',
      'н': 'n',
      'о': 'o',
      'п': 'p',
      'р': 'r',
      'с': 's',
      'т': 't',
      'у': 'u',
      'ф': 'f',
      'х': 'h',
      'ц': 'c',
      'ч': 'ch',
      'ш': 'sh',
      'щ': 'shch',
      'ъ': '',
      'ы': 'y',
      'ь': '',
      'э': 'e',
      'ю': 'yu',
      'я': 'ya',
      ' ': '-',
      '-': '-',
    };

    // split text to array
    let slugArr = text.split('');

    // get slug from convert letters to eng letters
    return slugArr
      .map(letter => {
        letter = letter.toLowerCase();
        return dic[letter] ?? letter;
      })
      .join('')
      .replace(/[!@#$%^&*()_+=?><":{}|\[\]\\;',.\/`~]/gi, '')
      .replace(/(-)+/gi, '-')
      .replace(/^(-)*/i, '')
      .replace(/(-)*$/i, '')
      .trim();
  }


}
