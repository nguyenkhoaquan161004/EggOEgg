import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../constants';
import { Order } from '../types/Order';
export default function useOrder(id: number) {
  const [orders, setOrder] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${Config.API_BASE_URL}/api/Order/buyer-history/${id}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch orders', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { orders, loading };
}