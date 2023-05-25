import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {rNames} from "../../../../app/app-routing.module";
import {environment} from "../../../../environments/environment";
import {WordService} from "../../../../app/services/word.service";
import {Word} from "../../../../app/interfaces/words/Word";
import {AdminWordService} from "../../../services/admin-word.service";

@Component({
  selector: 'app-admin-words-index',
  templateUrl: './admin-words-index.component.html',
  styleUrls: ['./admin-words-index.component.scss']
})
export class AdminWordsIndexComponent implements OnInit {
  r = rNames;
  newsList: Word[] = [];
  loading = false;
  page = 1;
  imagesPath = environment.imagesPath;

  constructor(private newsService: WordService,
              private route: ActivatedRoute,
              private adminNewsService: AdminWordService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: queries => {
        document.body.scrollIntoView();

        let page = parseInt(queries['page']);
        this.page = isNaN(page) ? 1 : page;

        this.loading = true;

        this.newsService
          .getWordsList(this.page, undefined, true)
          .subscribe({
            next: value => {
              this.newsList = value;
            }
          })
          .add(() => this.loading = false)

      }

    })


  }


  removeNews(newsId: number) {
    this.adminNewsService.removeWord(newsId)
  }
}
