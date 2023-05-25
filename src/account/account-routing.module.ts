import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserLoggedGuard} from "../app/guards/user-logged.guard";
import {rNames} from "../app/app-routing.module";
import {AccountLayoutComponent} from "./views/account-layout/account-layout.component";
import {AccountDashboardComponent} from "./views/account-dashboard/account-dashboard.component";
import {AccountCheckPaymentComponent} from "./views/account-check-payment/account-check-payment.component";
import {AccountNewsFavoritesComponent} from "./views/news/account-news-favorites/account-news-favorites.component";
import {AccountEditComponent} from "./views/account-edit/account-edit.component";
import {AccountPremiumComponent} from "./views/account-premium/account-premium.component";

const routes: Routes = [

  // account
  {
    path: '',
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


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
