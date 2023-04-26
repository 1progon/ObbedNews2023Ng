import {Component, Input} from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {News} from "../../../../../../interfaces/News";
import {rNames} from "../../../../../../app-routing.module";

@Component({
  selector: 'app-news-list-index',
  templateUrl: './news-list-index.component.html',
  styleUrls: ['./news-list-index.component.scss']
})
export class NewsListIndexComponent {
  @Input() newsList: News[] = [];
  @Input() loading: boolean = false;

  imagesPath: string = environment.imagesPath;

  r = rNames;

}
