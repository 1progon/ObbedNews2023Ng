import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WordsWrapperService} from "../words-wrapper.service";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {WordService} from "../../../services/word.service";
import {Word} from "../../../interfaces/words/Word";
import {rNames} from "../../../app-routing.module";

@Component({
  selector: 'app-word-wrapper',
  templateUrl: './word-wrapper.component.html',
  styleUrls: ['./word-wrapper.component.scss']
})
export class WordWrapperComponent implements OnInit {
  loading: boolean = false;

  constructor(private wordService: WordService,
              private wrapperService: WordsWrapperService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.wrapperService.word$.next({} as Word);
    this.wrapperService.nearbyWords$.next([]);

    this.route.params.subscribe({
      next: params => {
        this.loading = true;

        this.wrapperService.imageLoaded = false;
        this.wrapperService.expandedSections = [];

        this.wordService.getWordBySlug(params['slug'])
          .subscribe({
            next: value => {
              this.wrapperService.word$.next(value.word);
              this.wrapperService.nearbyWords$.next(value.nearbyWords);
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
