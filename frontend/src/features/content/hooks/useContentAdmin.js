import { useEffect, useState } from 'react';
import { checkContentAdmin, getContentAdminData } from '../services/contentAdminService';

export function useContentAdmin(userId) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState({ levels: [], units: [] });
  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [error, setError] = useState('');
  async function refresh() {
    try { if (await checkContentAdmin()) { setIsAdmin(true); setContent(await getContentAdminData()); } }
    catch (err) { setError(err.message); }
  }
  useEffect(() => {
    if (!userId) return undefined;
    let active = true;
    checkContentAdmin()
      .then((allowed) => allowed ? getContentAdminData() : null)
      .then((data) => { if (active && data) { setIsAdmin(true); setContent(data); } })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [userId]);
  return { isAdmin, content, isLoading, error, refresh };
}
