import {Component, OnInit} from "@angular/core";
import {Category} from "../../../../app/interfaces/words/Category";
import {CategoriesService} from "../../../../app/services/categories.service";

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
