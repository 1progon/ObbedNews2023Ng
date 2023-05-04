import {Component, OnInit} from '@angular/core';
import {ParentCategory} from "../../../../interfaces/ParentCategory";
import {CategoriesService} from "../../../../services/categories.service";
import {rNames} from "../../../../app-routing.module";

@Component({
  selector: 'app-admin-parent-categories-index',
  templateUrl: './admin-parent-categories-index.component.html',
  styleUrls: ['./admin-parent-categories-index.component.scss']
})
export class AdminParentCategoriesIndexComponent implements OnInit {
  parentCategories: ParentCategory[] = [];

  constructor(private catService: CategoriesService) {
  }

  ngOnInit(): void {
    this.catService.getParentCategories()
      .subscribe({
        next: value => {
          this.parentCategories = value;
        }
      })

  }


  protected readonly rNames = rNames;
}
