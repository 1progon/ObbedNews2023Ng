import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./views/main-layout/main-layout/main-layout.component";
import {LoginComponent} from "./views/main-layout/auth/login/login.component";
import {RegisterComponent} from "./views/main-layout/auth/register/register.component";
import {AccountDashboardComponent} from "./views/account-layout/account-dashboard/account-dashboard.component";
import {AccountLayoutComponent} from "./views/account-layout/account-layout/account-layout.component";
import {AdminLayoutComponent} from "./views/admin-layout/admin-layout/admin-layout.component";
import {AdminDashboardComponent} from "./views/admin-layout/admin-dashboard/admin-dashboard.component";
import {HomepageComponent} from "./views/main-layout/homepage/homepage/homepage.component";
import {UserSingleComponent} from "./views/main-layout/users/user-single/user-single.component";
import {UserReportComponent} from "./views/main-layout/users/user-report/user-report.component";
import {AdminOnlyGuard} from "./guards/admin-only.guard";
import {UserLoggedGuard} from "./guards/user-logged.guard";
import {
  AccountCheckPaymentComponent
} from "./views/account-layout/account-check-payment/account-check-payment.component";
import {
  AccountNewsFavoritesComponent
} from "./views/account-layout/news/account-news-favorites/account-news-favorites.component";
import {AccountEditComponent} from "./views/account-layout/account-edit/account-edit.component";
import {AccountPremiumComponent} from "./views/account-layout/account-premium/account-premium.component";
import {AdminUsersIndexComponent} from "./views/admin-layout/users/admin-users-index/admin-users-index.component";
import {AdminUserDetailComponent} from "./views/admin-layout/users/admin-user-detail/admin-user-detail.component";
import {AdminNewsIndexComponent} from "./views/admin-layout/news/admin-news-index/admin-news-index.component";
import {AdminNewsAddComponent} from "./views/admin-layout/news/admin-news-add/admin-news-add.component";
import {AdminNewsWrapperComponent} from "./views/admin-layout/news/admin-news-wrapper/admin-news-wrapper.component";
import {AdminNewsDetailComponent} from "./views/admin-layout/news/admin-news-detail/admin-news-detail.component";
import {AdminNewsEditComponent} from "./views/admin-layout/news/admin-news-edit/admin-news-edit.component";
import {AdminNewsRemoveComponent} from "./views/admin-layout/news/admin-news-remove/admin-news-remove.component";
import {
  AdminAddCategoryComponent
} from "./views/admin-layout/categories/admin-add-category/admin-add-category.component";
import {
  AdminCategoryDetailComponent
} from "./views/admin-layout/categories/admin-category-detail/admin-category-detail.component";
import {
  AdminAddParentCategoryComponent
} from "./views/admin-layout/categories/admin-add-parent-category/admin-add-parent-category.component";
import {
  AdminParentCategoryDetailComponent
} from "./views/admin-layout/categories/admin-parent-category-detail/admin-parent-category-detail.component";
import {NewsIndexComponent} from "./views/main-layout/news/news-index/news-index.component";
import {NewsWrapperComponent} from "./views/main-layout/news/news-wrapper/news-wrapper.component";
import {NewsSingleComponent} from "./views/main-layout/news/news-single/news-single.component";
import {NewsEpisodeComponent} from "./views/main-layout/news/news-episode/news-episode.component";
import {CategoriesIndexComponent} from "./views/main-layout/categories/categories-index/categories-index.component";
import {CategorySingleComponent} from "./views/main-layout/categories/category-single/category-single.component";
import {Error404Component} from "./views/main-layout/errors/error404/error404.component";
import {AdminCommentsComponent} from "./views/admin-layout/comments/admin-comments/admin-comments.component";
import {
  AdminCategoriesIndexComponent
} from "./views/admin-layout/categories/admin-categories-index/admin-categories-index.component";
import {
  AdminParentCategoriesIndexComponent
} from "./views/admin-layout/categories/admin-parent-categories-index/admin-parent-categories-index.component";

export const rNames = {

  // news
  news: 'pages',

  // base
  id: 'id',
  slug: 'slug',

  // base action
  add: 'add',
  edit: 'edit',
  detail: 'detail',
  remove: 'remove',
  favorites: 'favorites',
  report: 'report',

  // auth
  login: 'login',
  register: 'register',

  // account
  account: 'account',
  accountCheckPayment: 'check-payment',
  admin: 'admin',
  accountPremium: 'premium',


  // users
  users: 'users',

  // categories
  categories: 'sections',

  // admin parent categories
  parentCategories: 'parent-sections',

  // errors
  error404: '404',

  // tags
  tags: 'tags',

  // comments
  comments: 'comments',
  commentWaitModer: 'wait-moderation',


}

const routes: Routes = [

  {
    path: '', component: MainLayoutComponent, children: [
      // homepage
      {path: '', component: HomepageComponent, title: 'Новости на Оббед'},
      // {path: '', redirectTo: '/' + rNames.news, pathMatch: 'full'},

      // public users
      {
        path: rNames.users, children: [
          {
            path: ':' + rNames.id, children: [
              {path: '', component: UserSingleComponent},
              {path: rNames.report, component: UserReportComponent}
            ]
          },
        ]
      },

      // account
      {
        path: rNames.account,
        component: AccountLayoutComponent,
        canActivate: [UserLoggedGuard],
        children: [
          {
            path: '',
            component: AccountDashboardComponent,
            title: 'Account Dashboard',
            children: [
              {
                path: rNames.accountCheckPayment,
                component: AccountCheckPaymentComponent
              },
              {
                path: rNames.favorites,
                component: AccountNewsFavoritesComponent
              },
              {
                path: rNames.edit,
                component: AccountEditComponent,
              },
              {
                path: rNames.accountPremium,
                component: AccountPremiumComponent,
              },
            ]
          },

        ],
      },

      // admin
      {
        path: rNames.admin,
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
                  {path: '', component: AdminUsersIndexComponent, title: 'Admin Users Index'},
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
                path: rNames.news, children: [
                  {path: '', component: AdminNewsIndexComponent, title: 'All News'},
                  {path: rNames.add, component: AdminNewsAddComponent, title: 'Add News'},
                  {
                    path: ':' + rNames.id,
                    component: AdminNewsWrapperComponent,
                    children: [
                      {path: '', redirectTo: rNames.detail, pathMatch: 'full'},
                      {path: rNames.detail, component: AdminNewsDetailComponent},
                      {path: rNames.edit, component: AdminNewsEditComponent},
                      {path: rNames.remove, component: AdminNewsRemoveComponent},
                    ]
                  },
                ]
              },
              {
                path: rNames.categories, children: [
                  // index nested categories
                  {path: '', component: AdminCategoriesIndexComponent},

                  // index parent categories
                  {path: rNames.parentCategories, component: AdminParentCategoriesIndexComponent},

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
                path: rNames.parentCategories, children: [
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

      // auth
      {path: rNames.login, component: LoginComponent, title: 'Страница входа на сайт Оббед'},
      {path: rNames.register, component: RegisterComponent, title: 'Страница регистрации на сайте Оббед'},


      // news
      {
        path: rNames.news, children: [
          {path: '', component: NewsIndexComponent, title: 'Все страницы'},
          {
            path: ':' + rNames.slug,
            component: NewsWrapperComponent,
            children: [
              {path: '', component: NewsSingleComponent},
              {path: 'episodes/:episode', component: NewsEpisodeComponent},
            ]
          },
        ]
      },

      // categories
      {
        path: rNames.categories, children: [
          {path: '', component: CategoriesIndexComponent, title: 'Категории'},
          {path: ':' + rNames.slug, component: CategorySingleComponent},
        ]
      },

      {path: rNames.error404, component: Error404Component},
      {path: '**', pathMatch: 'full', redirectTo: '/' + rNames.error404}

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
