import {User} from "../User";
import {PaymentSystem} from "../../enums/payments/PaymentSystem";
import {OrderStatus} from "../../enums/payments/OrderStatus";
import {PaymentPlan} from "../../enums/payments/PaymentPlan";
import {PayPalStatuses} from "../../enums/payments/paypal/PayPalStatuses";

export interface PayPalOrder {
  id: number;

  user: User;
  userId: number;

  paymentPlan: PaymentPlan;
  paymentSystem: PaymentSystem;

  createdAt: string;
  updatedAt: string;

  expiresAt: string;

  isActive: boolean;

  status: OrderStatus;

  payPalOrderId: string;
  payPalOrderStatus: PayPalStatuses;

  payPalRequestId?: string;
}
