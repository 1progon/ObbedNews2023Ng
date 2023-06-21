import {Component, OnInit} from '@angular/core';
import {rNames} from "../../../app-routing.module";
import {environment} from "../../../../environments/environment";
import {Category} from "../../../interfaces/words/Category";
import {ParentCategory} from "../../../interfaces/words/ParentCategory";
import {CategoriesService} from "../../../services/categories.service";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";

@Component({
  selector: 'app-categories-index',
  templateUrl: './categories-index.component.html',
  styleUrls: ['./categories-index.component.scss']
})
export class CategoriesIndexComponent implements OnInit {
  r = rNames;
  imagesPath: string = environment.imagesPath;

  categories: Category[] = [];
  parentCategories: ParentCategory[] = [];
  loading: boolean = false;

  constructor(private categoriesService: CategoriesService,
              private htmlS: HtmlHeadOptionsService) {
  }

  ngOnInit(): void {
    this.htmlS.setCanonical(this.r.catNested);
    this.loading = true;
    this.categoriesService.getCategories()
      .subscribe({
        next: value => {
          this.categories = value;

          this.categories.map(value1 => {
            if (value1.parentCategory) {
              if (!this.parentCategories.find(pc => pc.id == value1.parentCategory?.id)) {
                this.parentCategories.push(value1.parentCategory)
              }
            }
          });


        }
      })
      .add(() => this.loading = false)

  }

}
