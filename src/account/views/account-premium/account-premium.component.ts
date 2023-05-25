import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Price} from "../../../app/interfaces/payment/Price";
import {PaymentPlan} from "../../../app/enums/payments/PaymentPlan";
import {PaymentSystem} from "../../../app/enums/payments/PaymentSystem";
import {PayPalOrder} from "../../../app/interfaces/payment/PayPalOrder";
import {AccountPremiumService} from "../../../app/services/account/account-premium.service";
import {AuthService} from "../../../app/services/auth.service";
import {CreateOrderDto} from "../../../app/dto/payments/payPal/CreateOrderDto";
import {PayPalStatuses} from "../../../app/enums/payments/paypal/PayPalStatuses";


@Component({
  selector: 'app-account-premium',
  templateUrl: './account-premium.component.html',
  styleUrls: ['./account-premium.component.scss']
})
export class AccountPremiumComponent implements OnInit {
  paypalPricePerMonth?: Price;
  loading = false;
  isPaying = false;
  Plans = PaymentPlan;
  System = PaymentSystem;

  paypalOrders = [] as PayPalOrder[];

  constructor(private premiumService: AccountPremiumService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService) {
  }

  getInitialData() {
    this.premiumService.getInitialData()
      .subscribe({
        next: value => {
          this.paypalPricePerMonth = value.prices
            ?.find(price => price.system == PaymentSystem.PayPal
              && price.plan == PaymentPlan.OneMonth
            ) as Price;

          this.paypalOrders = value.payPalOrders ?? [];

          if (this.auth.isLogged() && this.auth.user && this.paypalOrders?.length > 0) {
            this.auth.user.hasPremium = true;
            this.auth.setUserToStorage(this.auth.user);
          }
        }
      })
      .add(() => this.loading = false)

  }


  ngOnInit(): void {
    this.loading = true;

    this.premiumService.updatePayment.subscribe({
      next: () => {
        this.getInitialData();
      }
    })

  }

  payOnServer(system: PaymentSystem, plan: PaymentPlan, discount?: number) {
    if (this.isPaying) {
      return;
    }

    this.isPaying = true;

    // todo change front select tariff from providers and moths
    let orderDto: CreateOrderDto = {
      system, plan, discount
    }

    setTimeout(() => {
      this.premiumService.createOrder(orderDto)
        .subscribe({
          next: value => {
            if (value.status?.toLowerCase().replaceAll('_', '')
              == PayPalStatuses[PayPalStatuses.PayerActionRequired].toLowerCase()) {

              let w = window.open(value.links
                ?.find(l => l.rel == 'payer-action')?.href, '_blank');

              let index = 0;
              let waitResponse = 60 * 15; // 15 minutes
              let i = window.setInterval(() => {
                if (index > waitResponse) {
                  window.clearInterval(i);
                  return;
                }
                if (w?.closed) {
                  window.clearInterval(i);
                  this.premiumService.updatePayment.next(true);
                }
                index++;
              }, 1000)

            }
          },
          error: err => console.error(err)
        })
        .add(() => this.isPaying = false)
    }, 300)

  }

}
