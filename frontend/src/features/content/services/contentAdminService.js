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
