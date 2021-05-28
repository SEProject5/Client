import client from './client';
import { useState, useEffect } from 'react';

const useFetch = url => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState('initial error');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.get(url);
        setData(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
        console.log(e);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return { loading, data, error };
};

export default useFetch;
