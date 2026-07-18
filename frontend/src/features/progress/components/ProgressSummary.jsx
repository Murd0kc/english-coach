import { useUserProgress } from '../hooks/useUserProgress';
import './ProgressSummary.css';

export function ProgressSummary() {
  const { progress, analytics, isLoading, error } = useUserProgress();
  const completed = progress.filter((item) => item.status === 'completed').length;
  const attempts = progress.reduce((total, item) => total + item.attempts, 0);

  if (isLoading) return <p>Cargando tu progreso...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <>
      <div className="section-heading">
        <div><p className="eyebrow">Tu avance real</p><h2>Progreso</h2></div>
        <strong className="progress-value">{completed} completadas</strong>
      </div>
      <div className="progress-track"><span style={{ width: `${Math.min(completed * 10, 100)}%` }} /></div>
      <div className="progress-meta"><span>{progress.length} lecciones iniciadas</span><span>{attempts} intentos registrados</span></div>
      <div className="analytics-grid"><div><strong>{analytics.accuracy}%</strong><small>precisión</small></div><div><strong>{analytics.answers}</strong><small>respuestas</small></div><div><strong>{Math.max(0, analytics.answers - analytics.correct)}</strong><small>para repasar</small></div></div>
    </>
  );
}
