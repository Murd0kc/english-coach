import { useState } from 'react';
import { createExercise, createLesson, createLessonBlock, createUnit } from '../services/contentAdminService';
import { useContentAdmin } from '../hooks/useContentAdmin';
import './ContentAdminPanel.css';

export function ContentAdminPanel({ userId }) {
  const { isAdmin, content, isLoading, error, refresh } = useContentAdmin(userId);
  const [form, setForm] = useState({ levelId: '', unitId: '', lessonId: '', title: '', objective: '', theme: '', description: '', durationMinutes: 10, sortOrder: 1, blockType: 'grammar', blockText: '', exercisePrompt: '', optionA: '', optionB: '', optionC: '', correctOption: '0' });
  const [message, setMessage] = useState('');
  if (isLoading || !isAdmin) return null;
  const unitsForLevel = content.units.filter((unit) => unit.level_id === form.levelId);
  async function submitUnit(event) {
    event.preventDefault(); setMessage('');
    try { await createUnit(form); setMessage('Unidad creada como contenido administrable.'); setForm((current) => ({ ...current, title: '', objective: '', theme: '' })); await refresh(); } catch (err) { setMessage(err.message); }
  }
  async function submitLesson(event) {
    event.preventDefault(); setMessage('');
    try { await createLesson(form); setMessage('Lección creada como borrador.'); setForm((current) => ({ ...current, unitId: '', title: '', description: '' })); await refresh(); } catch (err) { setMessage(err.message); }
  }
  async function submitExercise(event) {
    event.preventDefault(); setMessage('');
    try { await createLessonBlock({ lessonId: form.lessonId, blockType: form.blockType, content: { explanation: form.blockText }, sortOrder: 1 }); await createExercise({ lessonId: form.lessonId, prompt: form.exercisePrompt, explanation: form.blockText, options: [{ text: form.optionA, correct: form.correctOption === '0' }, { text: form.optionB, correct: form.correctOption === '1' }, { text: form.optionC, correct: form.correctOption === '2' }] }); setMessage('Bloque y ejercicio creados.'); setForm((current) => ({ ...current, lessonId: '', blockText: '', exercisePrompt: '', optionA: '', optionB: '', optionC: '' })); await refresh(); } catch (err) { setMessage(err.message); }
  }
  const allLessons = content.units.flatMap((unit) => (unit.lessons ?? []).map((lesson) => ({ ...lesson, unitTitle: unit.title })));
  return <section className="content-admin" aria-labelledby="content-admin-title">
    <div className="section-heading"><div><p className="eyebrow">Administración</p><h2 id="content-admin-title">Panel de contenido</h2></div><span>{content.units.length} unidades</span></div>
    {error && <p role="alert">{error}</p>}
    <div className="admin-forms">
      <form onSubmit={submitUnit}><h3>Nueva unidad</h3><select required value={form.levelId} onChange={(event) => setForm({ ...form, levelId: event.target.value, unitId: '' })}><option value="">Selecciona nivel</option>{content.levels.map((level) => <option key={level.id} value={level.id}>{level.code} · {level.name}</option>)}</select><input required placeholder="Nombre de la unidad" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /><input required placeholder="Objetivo comunicativo" value={form.objective} onChange={(event) => setForm({ ...form, objective: event.target.value })} /><input placeholder="Tema" value={form.theme} onChange={(event) => setForm({ ...form, theme: event.target.value })} /><button className="primary-button" type="submit">Crear unidad</button></form>
      <form onSubmit={submitLesson}><h3>Nueva lección</h3><select required value={form.unitId} onChange={(event) => setForm({ ...form, unitId: event.target.value })}><option value="">Selecciona unidad</option>{unitsForLevel.map((unit) => <option key={unit.id} value={unit.id}>{unit.title}</option>)}</select><input required placeholder="Título de la lección" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /><textarea required placeholder="Descripción" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /><input type="number" min="5" max="60" value={form.durationMinutes} onChange={(event) => setForm({ ...form, durationMinutes: event.target.value })} /><button className="primary-button" type="submit">Crear borrador</button></form>
      <form onSubmit={submitExercise}><h3>Completar lección</h3><select required value={form.lessonId} onChange={(event) => setForm({ ...form, lessonId: event.target.value })}><option value="">Selecciona lección</option>{allLessons.map((lesson) => <option key={lesson.id} value={lesson.id}>{lesson.unitTitle} · {lesson.title}</option>)}</select><select value={form.blockType} onChange={(event) => setForm({ ...form, blockType: event.target.value })}><option value="grammar">Gramática</option><option value="vocabulary">Vocabulario</option><option value="pronunciation">Pronunciación</option><option value="reading">Lectura</option></select><textarea required placeholder="Explicación o contenido del bloque" value={form.blockText} onChange={(event) => setForm({ ...form, blockText: event.target.value })} /><input required placeholder="Pregunta del ejercicio" value={form.exercisePrompt} onChange={(event) => setForm({ ...form, exercisePrompt: event.target.value })} /><input required placeholder="Opción A" value={form.optionA} onChange={(event) => setForm({ ...form, optionA: event.target.value })} /><input required placeholder="Opción B" value={form.optionB} onChange={(event) => setForm({ ...form, optionB: event.target.value })} /><input required placeholder="Opción C" value={form.optionC} onChange={(event) => setForm({ ...form, optionC: event.target.value })} /><select value={form.correctOption} onChange={(event) => setForm({ ...form, correctOption: event.target.value })}><option value="0">Correcta: A</option><option value="1">Correcta: B</option><option value="2">Correcta: C</option></select><button className="primary-button" type="submit">Guardar contenido</button></form>
    </div>
    {message && <p role="status">{message}</p>}
    <div className="admin-content-list">{content.units.map((unit) => <article key={unit.id}><strong>{unit.title}</strong><small>{unit.lessons?.length ?? 0} lecciones · {unit.objective}</small></article>)}</div>
  </section>;
}
