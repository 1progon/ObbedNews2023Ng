import {Component} from '@angular/core';
import {AddParentCategoryDto} from "../../../../dto/categories/AddParentCategoryDto";
import {AdminCategoriesService} from "../../../../services/admin/admin-categories.service";
import {Router} from "@angular/router";
import {rNames} from "../../../../app-routing.module";

@Component({
  selector: 'app-admin-add-parent-category',
  templateUrl: './admin-add-parent-category.component.html',
  styleUrls: ['./admin-add-parent-category.component.scss']
})
export class AdminAddParentCategoryComponent {

  form: AddParentCategoryDto = <AddParentCategoryDto>{};
  isPosting = false;

  constructor(private adminCatService: AdminCategoriesService,
              private router: Router) {
  }

  onSubmit() {
    this.isPosting = true;

    this.adminCatService.addParentCategory(this.form)
      .subscribe({
        next: value => {
          this.router
            .navigate(['/', rNames.admin,
              rNames.parentCategories,
              value.id,
              rNames.parentCategoryDetail])
            .finally();
        },
        error: err => console.error(err)
      })
      .add(() => this.isPosting = false);
  }
}
