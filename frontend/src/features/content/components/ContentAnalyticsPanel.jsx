import { useEffect, useState } from 'react';
import { getContentAnalytics } from '../services/contentAnalyticsService';
import { checkContentAdmin } from '../services/contentAdminService';
import './ContentAnalyticsPanel.css';

export function ContentAnalyticsPanel() {
  const [metrics, setMetrics] = useState(null);
  useEffect(() => { checkContentAdmin().then((allowed) => allowed ? getContentAnalytics() : null).then((data) => data && setMetrics(data)).catch(() => {}); }, []);
  if (!metrics) return null;
  const accuracy = metrics.answers ? Math.round((metrics.correct_answers / metrics.answers) * 100) : 0;
  return <section className="content-analytics"><div className="section-heading"><div><p className="eyebrow">Analítica pedagógica</p><h2>Salud del aprendizaje</h2></div><span>{accuracy}% precisión global</span></div><div className="content-analytics-grid"><div><strong>{metrics.started_lessons}</strong><small>lecciones iniciadas</small></div><div><strong>{metrics.completed_lessons}</strong><small>lecciones completadas</small></div><div><strong>{metrics.answers}</strong><small>respuestas registradas</small></div><div><strong>{metrics.review_cards}</strong><small>tarjetas creadas</small></div><div><strong>{metrics.active_content}</strong><small>lecciones publicadas</small></div></div></section>;
}
