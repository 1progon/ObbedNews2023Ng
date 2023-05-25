import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppComponent} from "./app.component";
import {MainLayoutComponent} from "./views/main-layout/main-layout/main-layout.component";
import {LoginComponent} from "./views/main-layout/auth/login/login.component";
import {RegisterComponent} from "./views/main-layout/auth/register/register.component";
import {HomepageComponent} from "./views/main-layout/homepage/homepage/homepage.component";
import {HeaderComponent} from "./views/main-layout/include/header/header.component";
import {FooterComponent} from "./views/main-layout/include/footer/footer.component";
import {UserSingleComponent} from "./views/main-layout/users/user-single/user-single.component";
import {UserReportComponent} from "./views/main-layout/users/user-report/user-report.component";
import {CategorySingleComponent} from "./views/main-layout/categories/category-single/category-single.component";
import {CategoriesIndexComponent} from "./views/main-layout/categories/categories-index/categories-index.component";
import {Error404Component} from "./views/main-layout/errors/error404/error404.component";
import {AddTokenInterceptor} from "./interceptors/add-token.interceptor";
import {WordIndexComponent} from "./views/main-layout/words/word-index/word-index.component";
import {WordSingleComponent} from "./views/main-layout/words/word-single/word-single.component";
import {
  NewsCommentFormComponent
} from "./views/main-layout/words/include/news-comment-form/news-comment-form.component";
import {
  NewsCommentsListComponent
} from "./views/main-layout/words/include/news-comments-list/news-comments-list.component";
import {NewsListIndexComponent} from "./views/main-layout/words/include/list/news-list-index/news-list-index.component";
import {NewsListItemComponent} from "./views/main-layout/words/include/list/news-list-item/news-list-item.component";
import {WordEpisodeComponent} from "./views/main-layout/words/word-episode/word-episode.component";
import {WordWrapperComponent} from "./views/main-layout/words/word-wrapper/word-wrapper.component";
import {NewsIndexWrapperComponent} from "./views/main-layout/words/news-index-wrapper/news-index-wrapper.component";
import {AdminModule} from "../admin/admin.module";
import {ComponentsModule} from "../components/components.module";
import {AccountModule} from "../account/account.module";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    WordIndexComponent,
    WordSingleComponent,
    HeaderComponent,
    FooterComponent,
    NewsCommentFormComponent,
    NewsCommentsListComponent,
    NewsListIndexComponent,
    NewsListItemComponent,
    UserSingleComponent,
    UserReportComponent,
    WordEpisodeComponent,
    WordWrapperComponent,
    NewsIndexWrapperComponent,
    CategorySingleComponent,
    CategoriesIndexComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ComponentsModule,
    HttpClientModule,
    AccountModule,
    AdminModule,
    AppRoutingModule,
  ],
  providers: [
    {useClass: AddTokenInterceptor, provide: HTTP_INTERCEPTORS, multi: true}
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
