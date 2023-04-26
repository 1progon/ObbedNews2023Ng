import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {News} from "../../../../interfaces/News";
import {NewsService} from "../../../../services/news.service";
import {rNames} from "../../../../app-routing.module";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-news-index',
  templateUrl: './news-index.component.html',
  styleUrls: ['./news-index.component.scss']
})
export class NewsIndexComponent implements OnInit {
  r = rNames;
  newsList: News[] = [];
  page = 1;
  loading = true;

  constructor(public newsService: NewsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;

    // subscribe to route query params change
    this.route.queryParams
      .subscribe({
        next: queryParams => {
          this.loading = true;

          document.body.scrollIntoView();

          let page = parseInt(queryParams['page']);

          this.page = isNaN(page) ? 1 : page;


          // load data from service
          this.newsService.getNewsList(this.page)
            .subscribe({
              next: value => {
                this.newsList = value;

              },
              error: (err: HttpErrorResponse) => {
                console.error(err);
                if (err.status == HttpStatusCode.NotFound) {
                  this.router.navigate(['/', rNames.error404]).finally();
                }
              }
            })
            .add(() => this.loading = false)
        },
        error: err => console.error(err)
      })


  }


}
