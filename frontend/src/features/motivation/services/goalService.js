import { supabase } from '../../../lib/supabase';

function mondayKey() { const date = new Date(); const day = date.getDay() || 7; date.setDate(date.getDate() - day + 1); return date.toISOString().slice(0, 10); }

export async function getWeeklyGoal() {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;
  const weekStart = mondayKey();
  const { data: goal, error } = await supabase.from('weekly_goals').select('target_minutes, target_lessons').eq('user_id', userData.user.id).eq('week_start', weekStart).maybeSingle();
  if (error) throw new Error(`No se pudo cargar tu objetivo: ${error.message}`);
  if (!goal) { const { data: created, error: createError } = await supabase.from('weekly_goals').insert({ user_id: userData.user.id, week_start: weekStart }).select('target_minutes, target_lessons').single(); if (createError) throw new Error(`No se pudo crear tu objetivo: ${createError.message}`); return { ...created, minutes: 0, lessons: 0 }; }
  const { data: activity } = await supabase.from('daily_activity').select('minutes, lessons_completed').eq('user_id', userData.user.id).gte('activity_date', weekStart);
  return { ...goal, minutes: (activity ?? []).reduce((sum, item) => sum + item.minutes, 0), lessons: (activity ?? []).reduce((sum, item) => sum + item.lessons_completed, 0) };
}
