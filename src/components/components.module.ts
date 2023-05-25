import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {BtnLoaderComponent} from "./btn-loader/btn-loader.component";
import {CardComponent} from "./card/card/card.component";
import {CardBodyComponent} from "./card/card-body/card-body.component";
import {CardHeaderComponent} from "./card/card-header/card-header.component";
import {CardFooterComponent} from "./card/card-footer/card-footer.component";
import {ContainerComponent} from "./container/container.component";
import {LoaderComponent} from "./loader/loader.component";
import {PaginationComponent} from "./pagination/pagination.component";
import {PreloaderComponent} from "./preloader/preloader.component";
import {ToastsComponent} from "./toasts/toasts.component";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    BreadcrumbComponent,
    BtnLoaderComponent,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    CardFooterComponent,
    ContainerComponent,
    LoaderComponent,
    PaginationComponent,
    PreloaderComponent,
    ToastsComponent

  ],
  exports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    PreloaderComponent,
    LoaderComponent,
    CardFooterComponent,
    ToastsComponent,
    ContainerComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class ComponentsModule {
}
