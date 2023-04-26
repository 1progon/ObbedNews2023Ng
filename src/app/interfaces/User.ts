import type {Account} from "./Account";
import {PayPalOrder} from "./payment/PayPalOrder";

export interface User {
  id: number;

  account: Account;
  accountId: number;

  firstName?: string;
  lastName?: string;

  login: string;
  avatar?: string;

  payPalOrders: PayPalOrder[];

}
