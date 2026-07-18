import './SkillProfile.css';

const labels = { grammar: 'Gramática', vocabulary: 'Vocabulario', reading: 'Lectura', listening: 'Escucha', pronunciation: 'Pronunciación', conversation: 'Conversación' };

export function SkillProfile({ diagnostic }) {
  const scores = diagnostic?.skill_scores ?? {};
  const entries = Object.entries(scores);
  if (!entries.length) return null;
  return <section className="skill-profile"><div className="section-heading"><div><p className="eyebrow">Tu mapa de habilidades</p><h2>Nivel por área</h2></div><strong className="overall-level">{diagnostic.overall_level}</strong></div><div className="skill-grid">{entries.map(([skill, value]) => <article key={skill}><div><strong>{labels[skill] ?? skill}</strong><span>{value.level}</span></div><div className="skill-track"><span style={{ width: `${Math.max(18, ((value.score ?? 0) / Math.max(value.total ?? 1, 1)) * 100)}%` }} /></div><small>{value.score ?? 0} de {value.total ?? 0} respuestas correctas</small></article>)}</div></section>;
}
