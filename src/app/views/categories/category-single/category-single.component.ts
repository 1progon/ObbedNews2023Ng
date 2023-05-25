import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {rNames} from "../../../app-routing.module";
import {Word} from "../../../interfaces/words/Word";
import {WordService} from "../../../services/word.service";

@Component({
  selector: 'app-category-single',
  templateUrl: './category-single.component.html',
  styleUrls: ['./category-single.component.scss']
})
export class CategorySingleComponent implements OnInit {
  r = rNames;
  newsList: Word[] = [];
  page = 1;
  loading = false;
  slug = '';
  categoryName = '';
  parentCategoryName: string = '';

  constructor(private title: Title,
              private route: ActivatedRoute,
              private newsService: WordService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.queryParams.subscribe({
      next: queryParams => {
        this.loading = true;

        let page = parseInt(queryParams['page']);
        this.page = isNaN(page) ? 1 : page;


        this.route.params.subscribe({
          next: params => {

            this.loading = true;
            this.slug = params[this.r.slug];

            this.getData();
          }
        })
      }
    });


  }

  getData() {
    this.newsService
      .getWordsList(this.page, this.slug)
      .subscribe({
        next: value => {
          this.newsList = value;
          let category = this.newsList[0].category;
          this.categoryName = category.name;
          if (category.parentCategory) {
            this.parentCategoryName = category.parentCategory.name;
          }

          this.title.setTitle(this.categoryName + ' категория');

        },
        error: (err: HttpErrorResponse) => {
          if (err.status == HttpStatusCode.NotFound) {

            this.router.navigate(['/', this.r.error404]).finally();
            return;

          }
        }
      })
      .add(() => this.loading = false);
  }


}
