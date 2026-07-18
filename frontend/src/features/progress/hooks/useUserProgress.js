import { useEffect, useState } from 'react';
import { getUserProgress } from '../services/progressService';

export function useUserProgress() {
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    getUserProgress()
      .then((data) => isMounted && setProgress(data))
      .catch((err) => isMounted && setError(err.message))
      .finally(() => isMounted && setIsLoading(false));
    return () => { isMounted = false; };
  }, []);

  return { progress, isLoading, error };
}
