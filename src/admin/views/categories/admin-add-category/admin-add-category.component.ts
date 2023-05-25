import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ParentCategory} from "../../../../app/interfaces/words/ParentCategory";
import {AdminCategoriesService} from "../../../services/admin-categories.service";
import {CategoriesService} from "../../../../app/services/categories.service";
import {rNames} from "../../../../app/app-routing.module";
import {AddCategoryDto} from "../../../dto/categories/AddCategoryDto";

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.scss']
})
export class AdminAddCategoryComponent implements OnInit {
  form: AddCategoryDto = <AddCategoryDto>{};
  loading = false;
  isPosting = false;
  parentCats: ParentCategory[] = [];

  constructor(private adminCatService: AdminCategoriesService,
              private catService: CategoriesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.catService.getParentCategories()
      .subscribe({
        next: value => {
          this.parentCats = value;
        }
      })
      .add(() => this.loading = false)
  }


  onSubmit() {
    this.isPosting = true;


    this.adminCatService.addCategory(this.form)
      .subscribe({
        next: value => {
          this.router
            .navigate(['/', rNames.admin,
              rNames.catNested,
              value.id,
              rNames.show])
            .finally();
        },
        error: err => console.error(err)
      })
      .add(() => this.isPosting = false);
  }
}
