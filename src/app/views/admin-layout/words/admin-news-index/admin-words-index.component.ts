import {Component, OnInit} from '@angular/core';
import {WordService} from "../../../../services/word.service";
import {AdminWordService} from "../../../../services/admin/admin-word.service";
import {rNames} from "../../../../app-routing.module";
import {environment} from "../../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {Word} from "../../../../interfaces/words/Word";

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

        this.newsService.getWordsList(this.page)
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
