import {Component, OnInit} from '@angular/core';
import {ParentCategory} from "../../../../interfaces/ParentCategory";

@Component({
  selector: 'app-admin-parent-categories-index',
  templateUrl: './admin-parent-categories-index.component.html',
  styleUrls: ['./admin-parent-categories-index.component.scss']
})
export class AdminParentCategoriesIndexComponent implements OnInit{
  parentCategories: ParentCategory[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }


}
