import { useEffect, useState } from 'react';
import { getNextRecommendation } from '../services/recommendationService';
import './RecommendationPanel.css';

export function RecommendationPanel({ diagnostic, onSelectLesson }) {
  const [recommendation, setRecommendation] = useState(null); const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { getNextRecommendation(diagnostic).then(setRecommendation).catch(() => {}).finally(() => setIsLoading(false)); }, [diagnostic]);
  if (isLoading || !recommendation) return null;
  const { lesson, reason } = recommendation;
  return <section className="recommendation-panel"><div><p className="eyebrow">Recomendado para ti</p><h2>{lesson.title}</h2><p>{reason}</p><small>{lesson.levelCode} · {lesson.duration_minutes} minutos · {lesson.unitTitle}</small></div><button className="primary-button" type="button" onClick={() => onSelectLesson(lesson.id)}>Empezar →</button></section>;
}
