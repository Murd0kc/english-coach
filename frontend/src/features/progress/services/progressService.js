import { supabase } from '../../../lib/supabase';

export async function getUserProgress() {
  const { data, error } = await supabase
    .from('user_progress')
    .select('lesson_id, status, attempts, completed_at, updated_at');

  if (error) throw new Error(`No se pudo cargar el progreso: ${error.message}`);
  return data;
}
