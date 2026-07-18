import { useEffect, useState } from 'react';
import { getLatestDiagnostic } from '../services/diagnosticService';

export function useDiagnostic(userId) {
  const [diagnostic, setDiagnostic] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [error, setError] = useState('');
  useEffect(() => {
    if (!userId) return undefined;
    let active = true;
    getLatestDiagnostic(userId).then((data) => { if (active) setDiagnostic(data); }).catch((err) => { if (active) setError(err.message); }).finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [userId]);
  return { diagnostic, isLoading, error, setDiagnostic };
}
