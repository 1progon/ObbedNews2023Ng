import {PaymentSystem} from "../../enums/payments/PaymentSystem";

export interface PaymentConfig {
  account: string;
  clientId: string;
  production: boolean;
  system: PaymentSystem;
}
