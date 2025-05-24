import { Order } from '@/types/Order';
import { Payment } from '@/types/Payment';
import { useMemo } from 'react';

export default function useOrderPayment(order: Order) {
  const latestPayment = useMemo<Payment | null>(() => {
    if (!order.payments || order.payments.length === 0) return null;
    return order.payments.reduce((latest, curr) =>
      new Date(curr.paymentDate) > new Date(latest.paymentDate) ? curr : latest
    );
  }, [order]);

  return {
    payment: latestPayment,
  };
}
