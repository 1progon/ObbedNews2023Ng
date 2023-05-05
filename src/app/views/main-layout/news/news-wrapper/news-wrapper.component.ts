import {Component, OnInit} from '@angular/core';
import {NewsService} from "../../../../services/news.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsWrapperService} from "../news-wrapper.service";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {rNames} from "../../../../app-routing.module";
import {News} from "../../../../interfaces/News";

@Component({
  selector: 'app-news-wrapper',
  templateUrl: './news-wrapper.component.html',
  styleUrls: ['./news-wrapper.component.scss']
})
export class NewsWrapperComponent implements OnInit {
  loading: boolean = false;

  constructor(private newsService: NewsService,
              private wrapperService: NewsWrapperService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.wrapperService.news$.next({} as News);
    this.wrapperService.nearbyNews$.next([]);

    this.route.params.subscribe({
      next: params => {
        this.loading = true;

        this.wrapperService.imageLoaded = false;
        this.wrapperService.expandedSections = [];

        this.newsService.getNewsBySlug(params['slug'])
          .subscribe({
            next: value => {
              this.wrapperService.news$.next(value.news);
              this.wrapperService.nearbyNews$.next(value.nearbyNews);
            },
            error: (err: HttpErrorResponse) => {
              if (err.status == HttpStatusCode.NotFound) {

                this.router.navigate(['/', rNames.error404]).finally();
                return;

              }
            }
          })
          .add(() => this.loading = false)
      }
    })
  }


}
