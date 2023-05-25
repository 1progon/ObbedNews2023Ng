import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthService} from "../../app/services/auth.service";
import {CreateOrderDto} from "../../app/dto/payments/payPal/CreateOrderDto";
import {PayPalCreateOrderResponseDto} from "../../app/dto/payments/payPal/PayPalCreateOrderResponseDto";
import {CaptureOrderDto} from "../../app/dto/payments/payPal/CaptureOrderDto";
import {AccountPremiumInitialDto} from "../../admin/dto/accounts/AccountPremiumInitialDto";

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
        statusText: 'Нужно войти или зарегистрироваться'
      })
    }
    return this.http.get<AccountPremiumInitialDto>(this.api + '/GetInitialData');
  }

  createOrder(dto: CreateOrderDto) {
    if (!this.auth.isLogged()) {
      throw new HttpErrorResponse({
        status: HttpStatusCode.Unauthorized,
        statusText: 'Нужно войти или зарегистрироваться'
      })
    }

    return this.http.post<PayPalCreateOrderResponseDto>(this.api + '/CreateOrder', dto);
  }

  captureOrder(captureOrder: CaptureOrderDto) {
    if (!this.auth.isLogged()) {
      throw new HttpErrorResponse({
        status: HttpStatusCode.Unauthorized,
        statusText: 'Нужно войти или зарегистрироваться'
      })
    }

    return this.http.post<PayPalCreateOrderResponseDto>(this.api + '/CaptureOrder', captureOrder)
  }
}
