import { useEffect, useState } from 'react';
import { getLearningAnalytics, getUserProgress } from '../services/progressService';

export function useUserProgress() {
  const [progress, setProgress] = useState([]);
  const [analytics, setAnalytics] = useState({ answers: 0, correct: 0, accuracy: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    Promise.all([getUserProgress(), getLearningAnalytics()])
      .then(([data, analyticsData]) => { if (isMounted) { setProgress(data); setAnalytics(analyticsData); } })
      .catch((err) => isMounted && setError(err.message))
      .finally(() => isMounted && setIsLoading(false));
    return () => { isMounted = false; };
  }, []);

  return { progress, analytics, isLoading, error };
}
