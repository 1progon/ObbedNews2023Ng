import {Component, OnInit} from "@angular/core";
import {ParentCategory} from "../../../../app/interfaces/words/ParentCategory";
import {rNames} from "../../../../app/app-routing.module";
import {CategoriesService} from "../../../../app/services/categories.service";

@Component({
  selector: 'app-admin-parent-categories-index',
  templateUrl: './admin-parent-categories-index.component.html',
  styleUrls: ['./admin-parent-categories-index.component.scss']
})
export class AdminParentCategoriesIndexComponent implements OnInit {
  parentCategories: ParentCategory[] = [];
  protected readonly rNames = rNames;

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


}
