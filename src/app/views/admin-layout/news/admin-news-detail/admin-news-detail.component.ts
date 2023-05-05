import {Component, OnInit} from '@angular/core';
import {AdminNewsWrapperService} from "../admin-news-wrapper.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {News} from "../../../../interfaces/News";
import {rNames} from "../../../../app-routing.module";
import {AdminNewsWrapperComponent} from "../admin-news-wrapper/admin-news-wrapper.component";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-news-detail',
  templateUrl: './admin-news-detail.component.html',
  styleUrls: ['./admin-news-detail.component.scss']
})
export class AdminNewsDetailComponent implements OnInit {
  r = rNames;

  news?: News;
  imagesPath = environment.imagesPath;
  thumb?: string;

  redirectCard?: string;


  constructor(public route: ActivatedRoute,
              private wrapperService: AdminNewsWrapperService,
              public wrapperComponent: AdminNewsWrapperComponent,
              private titleService: Title) {
  }

  ngOnInit(): void {
    document.body.scrollIntoView();

    this.wrapperService.news$
      .subscribe({
        next: value => {
          this.news = value;
          this.titleService.setTitle('Admin News Detail ' + value.id + ': ' + value.name);

          this.redirectCard = `${environment.domain}/ref/red.php`;
          this.redirectCard += `?slug=${this.news.slug}`;
          this.redirectCard += `&title=${encodeURIComponent(this.news.name)}`;
          if (this.news.description) {
            this.redirectCard += `&desc=${encodeURIComponent(this.news.description.replace(/(\n|\t|<br\s*\/?>)/gi, ' '))}`;
          }

          if (value.mainThumb) {
            this.thumb = value.mainThumb + '?time=' + Date.now();
          }
        },
        error: (err) => console.log(err)
      })
  }

}
