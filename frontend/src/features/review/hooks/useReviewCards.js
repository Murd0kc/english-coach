import { useEffect, useState } from 'react';
import { getDueReviewCards } from '../services/reviewService';

export function useReviewCards() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let isMounted = true;
    getDueReviewCards().then((data) => isMounted && setCards(data)).catch((err) => isMounted && setError(err.message)).finally(() => isMounted && setIsLoading(false));
    return () => { isMounted = false; };
  }, []);
  return { cards, isLoading, error };
}
