import client from './client';
import { useState, useEffect } from 'react';

const useTestFetch = url => {
  const [loading, setLoading] = useState(true);
  const [data2, setData] = useState(null);
  const [error, setError] = useState('initial error');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.get(url);
        setData(response.data); // 데이터는 response.data 안에 들어있습니다.
        console.log(response.data);
      } catch (e) {
        setError(e);
        console.log('fetch 실패');
        console.log(e);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return { loading, data2, error };
};

export default useTestFetch;
