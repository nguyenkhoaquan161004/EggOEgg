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
  payments: Payment[];
    returnRequest: any| null;
}
export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled' ; 
