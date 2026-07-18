import { supabase } from '../../../lib/supabase';

export async function getDiagnosticItems() {
  const { data, error } = await supabase
    .from('diagnostic_items')
    .select('id, prompt, skill, level_code, options, sort_order')
    .order('sort_order', { ascending: true });
  if (error) throw new Error(`No se pudo cargar la prueba inicial: ${error.message}`);
  return data ?? [];
}

export async function getLatestDiagnostic(userId) {
  const { data, error } = await supabase
    .from('learning_diagnostics')
    .select('id, overall_level, skill_scores, completed_at')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(`No se pudo consultar tu diagnóstico: ${error.message}`);
  return data;
}

export async function saveDiagnostic({ userId, answers, items }) {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const scores = {};
  const totals = {};
  items.forEach((item) => {
    totals[item.skill] = (totals[item.skill] ?? 0) + 1;
    if (answers[item.id]) scores[item.skill] = (scores[item.skill] ?? 0) + 1;
  });
  const skillScores = Object.fromEntries(Object.entries(totals).map(([skill, total]) => {
    const percent = (scores[skill] ?? 0) / total;
    const levelIndex = Math.min(Math.floor(percent * 4), 3);
    return [skill, { score: scores[skill] ?? 0, total, level: levels[levelIndex] }];
  }));
  const average = Object.values(skillScores).reduce((sum, item) => sum + levels.indexOf(item.level), 0) / Math.max(Object.keys(skillScores).length, 1);
  const overallLevel = levels[Math.max(0, Math.min(Math.round(average), 3))];
  const { error } = await supabase.from('learning_diagnostics').insert({
    user_id: userId,
    overall_level: overallLevel,
    skill_scores: skillScores,
    answers: items.map((item) => ({ item_id: item.id, correct: Boolean(answers[item.id]) })),
  });
  if (error) throw new Error(`No se pudo guardar tu diagnóstico: ${error.message}`);
  return { overallLevel, skillScores };
}
