import {RouterModule, Routes} from "@angular/router";
import {rNames} from "../app/app-routing.module";
import {AdminOnlyGuard} from "../app/guards/admin-only.guard";
import {NgModule} from "@angular/core";
import {AdminLayoutComponent} from "./views/admin-layout/admin-layout.component";
import {AdminDashboardComponent} from "./views/admin-dashboard/admin-dashboard.component";
import {AdminUsersIndexComponent} from "./views/users/admin-users-index/admin-users-index.component";
import {AdminUserDetailComponent} from "./views/users/admin-user-detail/admin-user-detail.component";
import {AdminWordsIndexComponent} from "./views/words/admin-words-index/admin-words-index.component";
import {AdminWordAddComponent} from "./views/words/admin-word-add/admin-word-add.component";
import {AdminWordsWrapperComponent} from "./views/words/admin-word-wrapper/admin-words-wrapper.component";
import {AdminWordDetailComponent} from "./views/words/admin-word-detail/admin-word-detail.component";
import {AdminWordEditComponent} from "./views/words/admin-words-edit/admin-word-edit.component";
import {AdminWordRemoveComponent} from "./views/words/admin-word-remove/admin-word-remove.component";
import {
  AdminCategoriesIndexComponent
} from "./views/categories/admin-categories-index/admin-categories-index.component";
import {
  AdminParentCategoriesIndexComponent
} from "./views/categories/admin-parent-categories-index/admin-parent-categories-index.component";
import {AdminAddCategoryComponent} from "./views/categories/admin-add-category/admin-add-category.component";
import {AdminCategoryDetailComponent} from "./views/categories/admin-category-detail/admin-category-detail.component";
import {
  AdminAddParentCategoryComponent
} from "./views/categories/admin-add-parent-category/admin-add-parent-category.component";
import {
  AdminParentCategoryDetailComponent
} from "./views/categories/admin-parent-category-detail/admin-parent-category-detail.component";
import {AdminCommentsComponent} from "./views/comments/admin-comments/admin-comments.component";


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminOnlyGuard],
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
        title: 'Admin Only Dashboard',
        children: [
          {
            path: rNames.users, children: [
              {
                path: '', component: AdminUsersIndexComponent,
                title: 'Admin Users Index'
              },
              {
                path: ':' + rNames.id, children: [
                  {path: '', redirectTo: rNames.detail, pathMatch: 'full'},
                  {path: rNames.detail, component: AdminUserDetailComponent},
                  // {path: rNames.userEdit, component: AdminUserEditComponent},
                  // {path: rNames.userRemove, component: AdminUserRemoveComponent},
                ]
              },
            ]
          },
          {
            path: rNames.dictionary, children: [
              {path: '', component: AdminWordsIndexComponent, title: 'All Words'},
              {path: rNames.add, component: AdminWordAddComponent, title: 'Add Words'},
              {
                path: ':' + rNames.id,
                component: AdminWordsWrapperComponent,
                children: [
                  {path: '', redirectTo: rNames.detail, pathMatch: 'full'},
                  {path: rNames.detail, component: AdminWordDetailComponent},
                  {path: rNames.edit, component: AdminWordEditComponent},
                  {path: rNames.remove, component: AdminWordRemoveComponent},
                ]
              },
            ]
          },
          {
            path: rNames.catNested, children: [
              // index nested categories
              {path: '', component: AdminCategoriesIndexComponent},

              // index parent categories
              {path: rNames.catParent, component: AdminParentCategoriesIndexComponent},

              {path: rNames.add, component: AdminAddCategoryComponent},
              {
                path: ':' + rNames.id, children: [
                  {path: rNames.detail, component: AdminCategoryDetailComponent},
                  // {path: rNames.edit, component: 'edit'},
                  // {path: rNames.remove, component: 'remove'},
                ]
              }

            ]
          },
          {
            path: rNames.catParent, children: [
              {path: rNames.add, component: AdminAddParentCategoryComponent},
              {
                path: ':' + rNames.id, children: [
                  {path: rNames.detail, component: AdminParentCategoryDetailComponent},
                  // {path: routeNames.edit, component: 'edit'},
                  // {path: routeNames.remove, component: 'remove'},
                ]
              }


            ]
          },
          {
            path: rNames.comments, children: [
              {path: rNames.commentWaitModer, component: AdminCommentsComponent}
            ]
          }
        ]
      },


    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
