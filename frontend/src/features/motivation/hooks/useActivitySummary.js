import { useEffect, useState } from 'react';
import { getActivitySummary, recordDailyActivity } from '../services/activityService';

export function useActivitySummary(userId) {
  const [summary, setSummary] = useState({ streak: 0, todayMinutes: 0 });
  useEffect(() => {
    if (!userId) return undefined;
    let active = true;
    recordDailyActivity().then(() => getActivitySummary()).then((data) => { if (active) setSummary(data); }).catch(() => {});
    return () => { active = false; };
  }, [userId]);
  return summary;
}
