import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../../../services/categories.service";
import {Category} from "../../../../interfaces/words/Category";

@Component({
  selector: 'app-admin-categories-index',
  templateUrl: './admin-categories-index.component.html',
  styleUrls: ['./admin-categories-index.component.scss']
})
export class AdminCategoriesIndexComponent implements OnInit {
  categories: Category[] = [];

  constructor(private catService: CategoriesService) {
  }

  ngOnInit(): void {
    this.catService.getCategories()
      .subscribe({
        next: value => {
          this.categories = value;
        }
      })

  }
}
