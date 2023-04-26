import {PaymentSystem} from "../../../enums/payments/PaymentSystem";
import {PaymentPlan} from "../../../enums/payments/PaymentPlan";

export interface CreateOrderDto {
  system: PaymentSystem;
  plan: PaymentPlan;
  discount?: number;
}
