import {Price} from "../../../app/interfaces/payment/Price";
import {PayPalOrder} from "../../../app/interfaces/payment/PayPalOrder";

export interface AccountPremiumInitialDto {
  prices?: Price[];
  payPalOrders?: PayPalOrder[];
}
