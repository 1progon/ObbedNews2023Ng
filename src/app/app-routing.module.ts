import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./views/main-layout/main-layout.component";
import {HomepageComponent} from "./views/homepage/homepage/homepage.component";
import {UserSingleComponent} from "./views/users/user-single/user-single.component";
import {UserReportComponent} from "./views/users/user-report/user-report.component";
import {LoginComponent} from "./views/auth/login/login.component";
import {RegisterComponent} from "./views/auth/register/register.component";
import {WordIndexComponent} from "./views/words/word-index/word-index.component";
import {WordWrapperComponent} from "./views/words/word-wrapper/word-wrapper.component";
import {WordSingleComponent} from "./views/words/word-single/word-single.component";
import {WordEpisodeComponent} from "./views/words/word-episode/word-episode.component";
import {CategoriesIndexComponent} from "./views/categories/categories-index/categories-index.component";
import {CategorySingleComponent} from "./views/categories/category-single/category-single.component";
import {Error404Component} from "./views/errors/error404/error404.component";

export const rNames = {

  // news
  dictionary: 'dictionary',

  // base
  id: 'id',
  slug: 'slug',
  add: 'add',
  edit: 'edit',
  detail: 'detail',
  remove: 'remove',
  report: 'report',

  // auth
  login: 'login',
  register: 'register',

  // admin, account
  admin: 'admin',
  account: 'account',
  accountCheckPayment: 'check-payment',
  accountPremium: 'premium',

  // users
  users: 'users',

  // categories
  catNested: 'categories',
  catParent: 'parent-categories',

  // errors
  error404: '404',

  // tags
  tags: 'tags',

  // favorites
  favorites: 'favorites',

  // comments
  comments: 'comments',
  commentWaitModer: 'wait-moderation',

}

const routes: Routes = [

  {
    path: '', component: MainLayoutComponent, children: [
      // homepage
      {path: '', component: HomepageComponent, title: 'Английский на Оббед'},
      // {path: '', redirectTo: '/' + rNames.news, pathMatch: 'full'},

      // account
      {
        path: rNames.account, loadChildren: () => import('../account/account.module')
          .then(value => value.AccountModule)
      },

      // admin
      {
        path: rNames.admin, loadChildren: () => import('../admin/admin.module')
          .then(value => value.AdminModule)
      },

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

      // auth
      {path: rNames.login, component: LoginComponent, title: 'Страница входа на сайт Оббед'},
      {path: rNames.register, component: RegisterComponent, title: 'Страница регистрации на сайте Оббед'},


      // dictionary
      {
        path: rNames.dictionary, children: [
          {path: '', component: WordIndexComponent, title: 'Словарь'},
          {
            path: ':' + rNames.slug,
            component: WordWrapperComponent,
            children: [
              {path: '', component: WordSingleComponent},
              {path: 'episodes/:episode', component: WordEpisodeComponent},
            ]
          },
        ]
      },

      // categories
      {
        path: rNames.catNested, children: [
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
