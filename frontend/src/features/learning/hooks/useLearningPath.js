import { useEffect, useState } from 'react';
import { getLearningPath } from '../services/learningService';

export function useLearningPath() {
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadPath() {
      try {
        const data = await getLearningPath();

        if (isMounted) {
          setUnits(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPath();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    units,
    isLoading,
    error,
  };
}