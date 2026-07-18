import { useActivitySummary } from '../hooks/useActivitySummary';
import './ConsistencyBadge.css';

export function ConsistencyBadge({ userId }) {
  const { streak, todayMinutes } = useActivitySummary(userId);
  return <div className="consistency-badge"><span className="consistency-flame">🔥</span><div><strong>{streak} {streak === 1 ? 'día' : 'días'}</strong><small>{todayMinutes ? `${todayMinutes} min hoy` : 'Una práctica corta cuenta'}</small></div></div>;
}
