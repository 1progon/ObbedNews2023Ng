import {Price} from "../../interfaces/payment/Price";
import {PayPalOrder} from "../../interfaces/payment/PayPalOrder";

export interface AccountPremiumInitialDto {
  prices?: Price[];
  payPalOrders?: PayPalOrder[];
}
