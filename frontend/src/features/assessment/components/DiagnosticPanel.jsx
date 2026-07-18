import { useEffect, useState } from 'react';
import { getDiagnosticItems, saveDiagnostic } from '../services/diagnosticService';
import './DiagnosticPanel.css';

export function DiagnosticPanel({ userId, onCompleted }) {
  const [items, setItems] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { getDiagnosticItems().then(setItems).catch((err) => setError(err.message)).finally(() => setIsLoading(false)); }, []);
  if (isLoading) return <section className="diagnostic-panel"><p>Cargando tu diagnóstico...</p></section>;
  if (error) return <section className="diagnostic-panel"><p role="alert">{error}</p><small>El contenido de la prueba debe estar instalado en Supabase.</small></section>;
  if (!items.length) return null;
  const item = items[current];
  const selected = answers[item.id];
  async function choose(option) {
    const next = { ...answers, [item.id]: Boolean(option.correct) };
    setAnswers(next);
    if (current < items.length - 1) { setTimeout(() => setCurrent((value) => value + 1), 250); return; }
    setIsSaving(true);
    try { onCompleted(await saveDiagnostic({ userId, answers: next, items })); } catch (err) { setError(err.message); } finally { setIsSaving(false); }
  }
  return <section className="diagnostic-panel" aria-labelledby="diagnostic-title">
    <div className="diagnostic-intro"><p className="eyebrow">Primer paso</p><h1 id="diagnostic-title">Descubramos tu punto de partida.</h1><p>Son {items.length} preguntas. No necesitas saberlo todo: tus respuestas crearán una ruta enfocada en lo que más necesitas.</p></div>
    <div className="diagnostic-progress"><span style={{ width: `${((current + 1) / items.length) * 100}%` }} /></div>
    <p className="diagnostic-count">Pregunta {current + 1} de {items.length} · {item.skill}</p>
    <h2>{item.prompt}</h2>
    <div className="diagnostic-options">{item.options.map((option) => <button key={option.text} type="button" className={selected === Boolean(option.correct) ? 'diagnostic-option selected' : 'diagnostic-option'} onClick={() => choose(option)} disabled={isSaving}>{option.text}</button>)}</div>
    {isSaving && <p role="status">Calculando tu ruta...</p>}
  </section>;
}
