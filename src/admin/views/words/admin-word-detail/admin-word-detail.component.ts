import {Component, OnInit} from '@angular/core';
import {AdminWordsWrapperService} from "../admin-words-wrapper.service";
import {ActivatedRoute} from "@angular/router";
import {AdminWordsWrapperComponent} from "../admin-word-wrapper/admin-words-wrapper.component";
import {Title} from "@angular/platform-browser";
import {rNames} from "../../../../app/app-routing.module";
import {Word} from "../../../../app/interfaces/words/Word";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-admin-word-detail',
  templateUrl: './admin-word-detail.component.html',
  styleUrls: ['./admin-word-detail.component.scss']
})
export class AdminWordDetailComponent implements OnInit {
  r = rNames;

  news?: Word;
  imagesPath = environment.imagesPath;
  thumb?: string;

  redirectCard?: string;


  constructor(public route: ActivatedRoute,
              private wrapperService: AdminWordsWrapperService,
              public wrapperComponent: AdminWordsWrapperComponent,
              private titleService: Title) {
  }

  ngOnInit(): void {
    document.body.scrollIntoView();

    this.wrapperService.word$
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
