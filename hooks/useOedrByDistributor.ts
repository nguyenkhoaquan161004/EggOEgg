// hooks/useOrdersByBuyer.ts
import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../constants';
import { Order } from '../types/Order';

export default function useOrdersDistributor(distributorId: number) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${Config.API_BASE_URL}/api/Order/distributor-history/${distributorId}`);
        setOrders(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (distributorId) fetchOrders();
  }, [distributorId]);

  return { orders, loading, error };
}
