import { supabase } from '../../../lib/supabase';

export async function getUnitAssessment(unitId) {
  const { data, error } = await supabase.from('lessons').select('id, title, exercises(id, prompt, explanation, correct_answer, exercise_options(id, option_text, is_correct, sort_order))').eq('unit_id', unitId).eq('is_published', true).order('sort_order').limit(3);
  if (error) throw new Error(`No se pudo cargar la evaluación: ${error.message}`);
  return (data ?? []).flatMap((lesson) => (lesson.exercises ?? []).map((exercise) => ({ ...exercise, lessonTitle: lesson.title }))).slice(0, 5);
}

export async function saveUnitAssessment({ unitId, score, answers }) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Necesitas iniciar sesión para guardar la evaluación.');
  const { error } = await supabase.from('unit_assessment_attempts').insert({ user_id: userData.user.id, unit_id: unitId, score, answers, passed: score >= 80 });
  if (error) throw new Error(`No se pudo guardar la evaluación: ${error.message}`);
}
