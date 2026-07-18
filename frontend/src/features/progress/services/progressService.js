import { supabase } from '../../../lib/supabase';

export async function getUserProgress() {
  const { data, error } = await supabase
    .from('user_progress')
    .select('lesson_id, status, attempts, completed_at, updated_at');

  if (error) throw new Error(`No se pudo cargar el progreso: ${error.message}`);
  return data;
}

export async function getLearningAnalytics() {
  const { data, error } = await supabase.from('user_answers').select('is_correct, exercises (exercise_type)');
  if (error) throw new Error(`No se pudo cargar el análisis: ${error.message}`);
  const answers = data ?? [];
  const correct = answers.filter((answer) => answer.is_correct).length;
  return { answers: answers.length, correct, accuracy: answers.length ? Math.round((correct / answers.length) * 100) : 0 };
}
