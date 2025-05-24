import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../constants';
import { Store } from '../types/Store';

export default function useStore(id: number) {
    const [store, setStore] = useState<Store>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${Config.API_BASE_URL}/api/Store/${id}`)
            .then((res) => {
                setStore(res.data);
            })
            .catch((err) => {
                console.error('Failed to fetch store', err);
                setError('Failed to fetch store');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return { store, loading, error };
}