import { useEffect, useState } from 'react';
import { getWeeklyGoal } from '../services/goalService';
import './WeeklyGoal.css';

export function WeeklyGoal() {
  const [goal, setGoal] = useState(null);
  useEffect(() => { getWeeklyGoal().then(setGoal).catch(() => {}); }, []);
  if (!goal) return null;
  const minutePercent = Math.min(Math.round((goal.minutes / goal.target_minutes) * 100), 100); const lessonPercent = Math.min(Math.round((goal.lessons / goal.target_lessons) * 100), 100); const complete = minutePercent >= 100 && lessonPercent >= 100;
  return <section className="weekly-goal"><div className="section-heading"><div><p className="eyebrow">Misión semanal</p><h2>{complete ? 'Objetivo cumplido 🎉' : 'Un poco cada día'}</h2></div><span>{Math.max(minutePercent, lessonPercent)}%</span></div><div className="goal-row"><span>Tiempo de práctica</span><strong>{goal.minutes}/{goal.target_minutes} min</strong><div className="goal-track"><i style={{ width: `${minutePercent}%` }} /></div></div><div className="goal-row"><span>Lecciones completadas</span><strong>{goal.lessons}/{goal.target_lessons}</strong><div className="goal-track"><i style={{ width: `${lessonPercent}%` }} /></div></div><p className="goal-message">{complete ? 'Mañana puedes practicar sin presión o subir el reto.' : 'Las sesiones cortas también cuentan. Vuelve cuando tengas cinco minutos.'}</p></section>;
}
