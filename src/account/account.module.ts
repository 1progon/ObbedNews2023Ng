import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {AccountLayoutComponent} from "./views/account-layout/account-layout.component";
import {AccountDashboardComponent} from "./views/account-dashboard/account-dashboard.component";
import {AccountNewsFavoritesComponent} from "./views/news/account-news-favorites/account-news-favorites.component";
import {AccountEditComponent} from "./views/account-edit/account-edit.component";
import {AccountPremiumComponent} from "./views/account-premium/account-premium.component";
import {AccountCheckPaymentComponent} from "./views/account-check-payment/account-check-payment.component";
import {ComponentsModule} from "../components/components.module";


@NgModule({
  declarations: [
    AccountLayoutComponent,
    AccountDashboardComponent,
    AccountNewsFavoritesComponent,
    AccountEditComponent,
    AccountPremiumComponent,
    AccountCheckPaymentComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ComponentsModule
  ]
})
export class AccountModule {
}
