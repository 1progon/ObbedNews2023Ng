import {PaymentSystem} from "../../enums/payments/PaymentSystem";
import {PaymentPlan} from "../../enums/payments/PaymentPlan";
import {Currency} from "./Currency";

export interface Price {
  sum: number;
  system: PaymentSystem;
  plan: PaymentPlan;
  currency: Currency;
  currencyId: number;
}
