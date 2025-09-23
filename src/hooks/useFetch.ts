import { useEffect, useState } from 'react';

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }

        const json: T = await res.json();
        if (isMounted) setData(json);
      } catch (err) {
        if (isMounted && err instanceof Error) {
          setError(err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
