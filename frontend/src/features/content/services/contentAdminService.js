import { supabase } from '../../../lib/supabase';

export async function checkContentAdmin() {
  const { data, error } = await supabase.rpc('is_content_admin');
  if (error) throw new Error(`No se pudo verificar el acceso de contenido: ${error.message}`);
  return Boolean(data);
}

export async function getContentAdminData() {
  const [{ data: levels, error: levelsError }, { data: units, error: unitsError }] = await Promise.all([
    supabase.from('levels').select('id, code, name, sort_order').order('sort_order'),
    supabase.from('units').select('id, level_id, title, objective, theme, sort_order, lessons(id, title, description, duration_minutes, is_published)').order('sort_order'),
  ]);
  if (levelsError || unitsError) throw new Error(`No se pudo cargar el contenido: ${(levelsError || unitsError).message}`);
  return { levels: levels ?? [], units: units ?? [] };
}

export async function createUnit({ levelId, title, objective, theme, sortOrder }) {
  const { error } = await supabase.from('units').insert({ level_id: levelId, title, objective, theme, sort_order: Number(sortOrder) || 1 });
  if (error) throw new Error(`No se pudo crear la unidad: ${error.message}`);
}

export async function createLesson({ unitId, title, description, durationMinutes, sortOrder }) {
  const { error } = await supabase.from('lessons').insert({ unit_id: unitId, title, description, duration_minutes: Number(durationMinutes) || 10, sort_order: Number(sortOrder) || 1, is_published: false });
  if (error) throw new Error(`No se pudo crear la lección: ${error.message}`);
}

export async function createLessonBlock({ lessonId, blockType, content, sortOrder }) {
  const { error } = await supabase.from('lesson_blocks').insert({ lesson_id: lessonId, block_type: blockType, content, sort_order: Number(sortOrder) || 1 });
  if (error) throw new Error(`No se pudo crear el bloque: ${error.message}`);
}

export async function createExercise({ lessonId, prompt, explanation, options }) {
  const { data, error } = await supabase.from('exercises').insert({ lesson_id: lessonId, exercise_type: 'multiple_choice', prompt, explanation, difficulty: 1, sort_order: 1 }).select('id').single();
  if (error) throw new Error(`No se pudo crear el ejercicio: ${error.message}`);
  const { error: optionsError } = await supabase.from('exercise_options').insert(options.map((option, index) => ({ exercise_id: data.id, option_text: option.text, is_correct: option.correct, sort_order: index + 1 })));
  if (optionsError) throw new Error(`No se pudieron crear las opciones: ${optionsError.message}`);
}
