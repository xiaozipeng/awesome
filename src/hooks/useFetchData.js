// store.js
import { useState, useEffect, useCallback } from 'react';

const token = ``;  // 你可以根据需要调整 token 的来源
// 自定义 hook，接收 URL 和 token 参数
export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    if (!url) return;
    setLoading(true);
    setError(null);

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // 添加 Authorization header
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('网络请求失败');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [url]); // `url` 和 `token` 作为依赖项

  useEffect(() => {
    fetchData();  // 组件加载时自动调用 fetchData
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData }; // 返回手动调用接口的函数
};