import {PayPalOrder} from "../../../interfaces/payment/PayPalOrder";

export interface PayPalCreateOrderResponseDto {
  id: string;
  status?: string;
  links?: { href: string, rel: string, method: string }[];
  order: PayPalOrder;

}

