import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AddParentCategoryDto} from "../../../../app/dto/categories/AddParentCategoryDto";
import {AdminCategoriesService} from "../../../services/admin-categories.service";
import {rNames} from "../../../../app/app-routing.module";

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
              rNames.catParent,
              value.id,
              rNames.show])
            .finally();
        },
        error: err => console.error(err)
      })
      .add(() => this.isPosting = false);
  }
}
