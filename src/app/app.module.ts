import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppComponent} from "./app.component";
import {AccountLayoutComponent} from "./views/account-layout/account-layout/account-layout.component";
import {AccountDashboardComponent} from "./views/account-layout/account-dashboard/account-dashboard.component";
import {MainLayoutComponent} from "./views/main-layout/main-layout/main-layout.component";
import {LoginComponent} from "./views/main-layout/auth/login/login.component";
import {RegisterComponent} from "./views/main-layout/auth/register/register.component";
import {HomepageComponent} from "./views/main-layout/homepage/homepage/homepage.component";
import {ContainerComponent} from "./components/container/container.component";
import {CardComponent} from "./components/card/card/card.component";
import {CardHeaderComponent} from "./components/card/card-header/card-header.component";
import {CardBodyComponent} from "./components/card/card-body/card-body.component";
import {CardFooterComponent} from "./components/card/card-footer/card-footer.component";
import {HeaderComponent} from "./views/main-layout/include/header/header.component";
import {FooterComponent} from "./views/main-layout/include/footer/footer.component";
import {ToastsComponent} from "./components/toasts/toasts.component";
import {AdminLayoutComponent} from "./views/admin-layout/admin-layout/admin-layout.component";
import {AdminDashboardComponent} from "./views/admin-layout/admin-dashboard/admin-dashboard.component";
import {AdminWordAddComponent} from "./views/admin-layout/words/admin-news-add/admin-word-add.component";
import {PreloaderComponent} from "./components/preloader/preloader.component";
import {AdminWordsIndexComponent} from "./views/admin-layout/words/admin-news-index/admin-words-index.component";
import {AdminWordEditComponent} from "./views/admin-layout/words/admin-news-edit/admin-word-edit.component";
import {AdminWordDetailComponent} from "./views/admin-layout/words/admin-news-detail/admin-word-detail.component";
import {AdminWordRemoveComponent} from "./views/admin-layout/words/admin-news-remove/admin-word-remove.component";
import {AdminWordsWrapperComponent} from "./views/admin-layout/words/admin-news-wrapper/admin-words-wrapper.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {UserSingleComponent} from "./views/main-layout/users/user-single/user-single.component";
import {UserReportComponent} from "./views/main-layout/users/user-report/user-report.component";
import {BreadcrumbComponent} from "./components/breadcrumb/breadcrumb.component";
import {
  AccountNewsFavoritesComponent
} from "./views/account-layout/news/account-news-favorites/account-news-favorites.component";
import {
  AdminAddCategoryComponent
} from "./views/admin-layout/categories/admin-add-category/admin-add-category.component";
import {
  AdminAddParentCategoryComponent
} from "./views/admin-layout/categories/admin-add-parent-category/admin-add-parent-category.component";
import {
  AdminParentCategoryDetailComponent
} from "./views/admin-layout/categories/admin-parent-category-detail/admin-parent-category-detail.component";
import {
  AdminCategoryDetailComponent
} from "./views/admin-layout/categories/admin-category-detail/admin-category-detail.component";
import {AccountEditComponent} from "./views/account-layout/account-edit/account-edit.component";
import {AccountPremiumComponent} from "./views/account-layout/account-premium/account-premium.component";
import {
  AccountCheckPaymentComponent
} from "./views/account-layout/account-check-payment/account-check-payment.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {CategorySingleComponent} from "./views/main-layout/categories/category-single/category-single.component";
import {CategoriesIndexComponent} from "./views/main-layout/categories/categories-index/categories-index.component";
import {Error404Component} from "./views/main-layout/errors/error404/error404.component";
import {AdminUsersIndexComponent} from "./views/admin-layout/users/admin-users-index/admin-users-index.component";
import {AdminUserDetailComponent} from "./views/admin-layout/users/admin-user-detail/admin-user-detail.component";
import {AddTokenInterceptor} from "./interceptors/add-token.interceptor";
import {AdminCommentsComponent} from "./views/admin-layout/comments/admin-comments/admin-comments.component";
import {
  AdminCategoriesIndexComponent
} from './views/admin-layout/categories/admin-categories-index/admin-categories-index.component';
import {
  AdminParentCategoriesIndexComponent
} from './views/admin-layout/categories/admin-parent-categories-index/admin-parent-categories-index.component';
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
import {SpeechPartsComponent} from './views/admin-layout/words/include/speech-parts/speech-parts.component';
import {SoundsComponent} from './views/admin-layout/words/include/sounds/sounds.component';
import {MeaningsComponent} from "./views/admin-layout/words/include/meanings/meanings.component";
import {SpecBlocksComponent} from "./views/admin-layout/words/include/spec-blocks/spec-blocks.component";
import {
  DefinitionsListComponent
} from "./views/admin-layout/words/include/definitions/definitions-list/definitions-list.component";
import {
  DefinitionsListItemComponent
} from "./views/admin-layout/words/include/definitions/definitions-list-item/definitions-list-item.component";

@NgModule({
  declarations: [
    AppComponent,
    AccountLayoutComponent,
    AccountDashboardComponent,
    MainLayoutComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    WordIndexComponent,
    WordSingleComponent,
    ContainerComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    HeaderComponent,
    FooterComponent,
    NewsCommentFormComponent,
    NewsCommentsListComponent,
    NewsListIndexComponent,
    NewsListItemComponent,
    ToastsComponent,
    AdminLayoutComponent,
    AdminDashboardComponent,
    AdminWordAddComponent,
    PreloaderComponent,
    AdminWordsIndexComponent,
    AdminWordEditComponent,
    AdminWordDetailComponent,
    AdminWordRemoveComponent,
    AdminWordsWrapperComponent,
    PaginationComponent,
    UserSingleComponent,
    UserReportComponent,
    BreadcrumbComponent,
    AccountNewsFavoritesComponent,
    AdminAddCategoryComponent,
    AdminAddParentCategoryComponent,
    AdminParentCategoryDetailComponent,
    AdminCategoryDetailComponent,
    AccountEditComponent,
    AccountPremiumComponent,
    AccountCheckPaymentComponent,
    WordEpisodeComponent,
    WordWrapperComponent,
    LoaderComponent,
    NewsIndexWrapperComponent,
    CategorySingleComponent,
    CategoriesIndexComponent,
    Error404Component,
    AdminUsersIndexComponent,
    AdminUserDetailComponent,
    AdminCommentsComponent,
    AdminCategoriesIndexComponent,
    AdminParentCategoriesIndexComponent,
    SpeechPartsComponent,
    MeaningsComponent,
    DefinitionsListComponent,
    DefinitionsListItemComponent,
    SoundsComponent,
    SpecBlocksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
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
