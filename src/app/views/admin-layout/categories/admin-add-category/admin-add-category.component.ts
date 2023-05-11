import {Component, OnInit} from '@angular/core';
import {AddCategoryDto} from "../../../../dto/categories/AddCategoryDto";
import {AdminCategoriesService} from "../../../../services/admin/admin-categories.service";
import {Router} from "@angular/router";
import {rNames} from "../../../../app-routing.module";
import {CategoriesService} from "../../../../services/categories.service";
import {ParentCategory} from "../../../../interfaces/words/ParentCategory";

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
