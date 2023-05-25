import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {rNames} from "../../../app-routing.module";
import {Word} from "../../../interfaces/words/Word";
import {WordService} from "../../../services/word.service";

@Component({
  selector: 'app-word-index',
  templateUrl: './word-index.component.html',
  styleUrls: ['./word-index.component.scss']
})
export class WordIndexComponent implements OnInit {
  r = rNames;
  newsList: Word[] = [];
  page = 1;
  loading = true;

  constructor(public wordService: WordService,
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
          this.wordService.getWordsList(this.page)
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
