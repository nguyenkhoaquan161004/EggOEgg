import { OrderDetail } from './OrderDetail';
import { Payment } from './Payment';

export interface Order {
  orderId: number;
  buyerId: number;
  distributorId: number;
  orderDate: string;
  status: OrderStatus;
  shippingAddress: string;
  complaints: any[];
  orderDetails: OrderDetail[];
  payment: Payment;
  returnRequest: any| null;
}
export type OrderStatus = 'SHIPPING' | 'DELIVERED' | 'DISDELIVERED' | 'RETURN' ; 
export interface CreateOrderCommand {
  buyerId: number;
  distributorId: number;
  paymentMethod?: string | null;
  shippingAddress?: string | null;
}