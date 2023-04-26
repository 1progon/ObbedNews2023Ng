import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "../auth.service";
import {PayPalCreateOrderResponseDto} from "../../dto/payments/payPal/PayPalCreateOrderResponseDto";
import {CreateOrderDto} from "../../dto/payments/payPal/CreateOrderDto";
import {CaptureOrderDto} from "../../dto/payments/payPal/CaptureOrderDto";
import {AccountPremiumInitialDto} from "../../dto/accounts/AccountPremiumInitialDto";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountPremiumService {
  controller = 'Payment';
  api = environment.apiBase + '/' + this.controller;

  updatePayment: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  getInitialData() {
    if (!this.auth.isLogged()) {
      throw new HttpErrorResponse({
        status: HttpStatusCode.Unauthorized,
        statusText: 'Need to login or register'
      })
    }
    return this.http.get<AccountPremiumInitialDto>(this.api + '/GetInitialData');
  }

  createOrder(dto: CreateOrderDto) {
    if (!this.auth.isLogged()) {
      throw new HttpErrorResponse({
        status: HttpStatusCode.Unauthorized,
        statusText: 'Need to login or register'
      })
    }

    return this.http.post<PayPalCreateOrderResponseDto>(this.api + '/CreateOrder', dto);
  }

  captureOrder(captureOrder: CaptureOrderDto) {
    if (!this.auth.isLogged()) {
      throw new HttpErrorResponse({
        status: HttpStatusCode.Unauthorized,
        statusText: 'Need to login or register'
      })
    }

    return this.http.post<PayPalCreateOrderResponseDto>(this.api + '/CaptureOrder', captureOrder)
  }
}
