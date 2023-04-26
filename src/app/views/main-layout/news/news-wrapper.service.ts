import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {News} from "../../../interfaces/News";

@Injectable({
  providedIn: 'root'
})
export class NewsWrapperService {
  news$: BehaviorSubject<News> = new BehaviorSubject<News>({} as News);
  imageLoaded: boolean = false;

  expandedSections = <boolean[]>[];

  constructor() {
  }
}
