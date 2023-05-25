import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {ComponentsModule} from "../components/components.module";
import {FormsModule} from "@angular/forms";
import {AdminDashboardComponent} from "./views/admin-dashboard/admin-dashboard.component";
import {AdminLayoutComponent} from "./views/admin-layout/admin-layout.component";
import {AdminAddCategoryComponent} from "./views/categories/admin-add-category/admin-add-category.component";
import {
  AdminAddParentCategoryComponent
} from "./views/categories/admin-add-parent-category/admin-add-parent-category.component";
import {
  AdminCategoriesIndexComponent
} from "./views/categories/admin-categories-index/admin-categories-index.component";
import {AdminCategoryDetailComponent} from "./views/categories/admin-category-detail/admin-category-detail.component";
import {
  AdminParentCategoriesIndexComponent
} from "./views/categories/admin-parent-categories-index/admin-parent-categories-index.component";
import {
  AdminParentCategoryDetailComponent
} from "./views/categories/admin-parent-category-detail/admin-parent-category-detail.component";
import {AdminCommentsComponent} from "./views/comments/admin-comments/admin-comments.component";
import {AdminUserDetailComponent} from "./views/users/admin-user-detail/admin-user-detail.component";
import {AdminUsersIndexComponent} from "./views/users/admin-users-index/admin-users-index.component";
import {AdminWordAddComponent} from "./views/words/admin-word-add/admin-word-add.component";
import {AdminWordDetailComponent} from "./views/words/admin-word-detail/admin-word-detail.component";
import {AdminWordRemoveComponent} from "./views/words/admin-word-remove/admin-word-remove.component";
import {AdminWordsWrapperComponent} from "./views/words/admin-word-wrapper/admin-words-wrapper.component";
import {AdminWordEditComponent} from "./views/words/admin-words-edit/admin-word-edit.component";
import {AdminWordsIndexComponent} from "./views/words/admin-words-index/admin-words-index.component";
import {DefinitionsListComponent} from "./views/words/include/definitions/definitions-list/definitions-list.component";
import {
  DefinitionsListItemComponent
} from "./views/words/include/definitions/definitions-list-item/definitions-list-item.component";
import {MeaningsComponent} from "./views/words/include/meanings/meanings.component";
import {SoundsComponent} from "./views/words/include/sounds/sounds.component";
import {SpecBlocksComponent} from "./views/words/include/spec-blocks/spec-blocks.component";
import {SpeechPartsComponent} from "./views/words/include/speech-parts/speech-parts.component";


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminLayoutComponent,
    AdminAddCategoryComponent,
    AdminAddParentCategoryComponent,
    AdminCategoriesIndexComponent,
    AdminCategoryDetailComponent,
    AdminParentCategoriesIndexComponent,
    AdminParentCategoryDetailComponent,
    AdminCommentsComponent,
    AdminUserDetailComponent,
    AdminUsersIndexComponent,
    AdminWordAddComponent,
    AdminWordDetailComponent,
    AdminWordRemoveComponent,
    AdminWordsWrapperComponent,
    AdminWordEditComponent,
    AdminWordsIndexComponent,
    DefinitionsListComponent,
    DefinitionsListItemComponent,
    MeaningsComponent,
    SoundsComponent,
    SpecBlocksComponent,
    SpeechPartsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    AdminRoutingModule,
  ]
})
export class AdminModule {
}
