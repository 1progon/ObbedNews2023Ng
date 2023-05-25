import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CaptureOrderDto} from "../../../app/dto/payments/payPal/CaptureOrderDto";
import {rNames} from "../../../app/app-routing.module";
import {AccountPremiumService} from "../../services/account-premium.service";


@Component({
  selector: 'app-account-check-payment',
  templateUrl: './account-check-payment.component.html',
  styleUrls: ['./account-check-payment.component.scss']
})
export class AccountCheckPaymentComponent implements OnInit {

  captureOrder: CaptureOrderDto = <CaptureOrderDto>{};
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private premiumService: AccountPremiumService) {
  }

  ngOnInit(): void {

    this.loading = true;
    this.route.queryParams.subscribe({
      next: params => {
        let {token, PayerID} = params as { token: string; PayerID: string };

        if (!token || !PayerID) {
          // todo toast error
          this.router.navigate(['/', rNames.account]).finally();
          return;
        }


        this.captureOrder = {
          token, PayerID
        }

        this.premiumService.captureOrder(this.captureOrder)
          .subscribe({
            next: () => {
              window.close();
            },
            error: err => console.error(err)
          })
          .add(() => this.loading = false)
      },
      error: err => console.error(err)
    })
  }


}
