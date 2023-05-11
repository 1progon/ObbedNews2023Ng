import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Word} from "../../../interfaces/words/Word";

@Injectable({
  providedIn: 'root'
})
export class WordWrapperService {
  word$: BehaviorSubject<Word> = new BehaviorSubject<Word>({} as Word);
  nearbyWords$: BehaviorSubject<Word[]> = new BehaviorSubject<Word[]>([]);

  imageLoaded: boolean = false;

  expandedSections = <boolean[]>[];

  constructor() {
  }
}
