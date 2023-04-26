import {Component, OnInit} from '@angular/core';
import {News} from "../../../../interfaces/News";
import {NewsService} from "../../../../services/news.service";
import {AdminNewsService} from "../../../../services/admin/admin-news.service";
import {rNames} from "../../../../app-routing.module";
import {environment} from "../../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-news-index',
  templateUrl: './admin-news-index.component.html',
  styleUrls: ['./admin-news-index.component.scss']
})
export class AdminNewsIndexComponent implements OnInit {
  r = rNames;
  newsList: News[] = [];
  loading = false;
  page = 1;
  imagesPath = environment.imagesPath;

  constructor(private newsService: NewsService,
              private route: ActivatedRoute,
              private adminNewsService: AdminNewsService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: queries => {
        document.body.scrollIntoView();

        let page = parseInt(queries['page']);
        this.page = isNaN(page) ? 1 : page;

        this.loading = true;

        this.newsService.getNewsList(this.page)
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
    this.adminNewsService.removeNews(newsId)
  }
}
