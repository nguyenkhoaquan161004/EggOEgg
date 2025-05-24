import { Product } from "./Product";

export interface OrderDetail {
    orderDetailId: number;
    orderId: number;
    eggId: number;
    quantity: number;
    unitPrice: number;
    egg: Product;
  }