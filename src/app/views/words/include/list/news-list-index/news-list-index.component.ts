import {Component, Input} from '@angular/core';
import {Word} from "../../../../../interfaces/words/Word";
import {environment} from "../../../../../../environments/environment";
import {rNames} from "../../../../../app-routing.module";

@Component({
  selector: 'app-news-list-index',
  templateUrl: './news-list-index.component.html',
  styleUrls: ['./news-list-index.component.scss']
})
export class NewsListIndexComponent {
  @Input() newsList: Word[] = [];
  @Input() loading: boolean = false;

  imagesPath: string = environment.imagesPath;

  r = rNames;

}
