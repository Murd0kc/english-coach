import { useEffect, useState } from 'react';
import { getLessonById } from '../services/learningService';

export function useLesson(lessonId) {
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(lessonId));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!lessonId) return undefined;
    let isMounted = true;
    setIsLoading(true);
    setError('');
    getLessonById(lessonId)
      .then((data) => isMounted && setLesson(data))
      .catch((err) => isMounted && setError(err.message))
      .finally(() => isMounted && setIsLoading(false));
    return () => { isMounted = false; };
  }, [lessonId]);

  return { lesson, isLoading, error };
}
