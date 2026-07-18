import { supabase } from '../../../lib/supabase';

function dateKey(date = new Date()) { return date.toISOString().slice(0, 10); }

export async function recordDailyActivity({ lessonsCompleted = 0, exercisesAnswered = 0, minutes = 1 } = {}) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;
  const { data: existing } = await supabase.from('daily_activity').select('minutes, lessons_completed, exercises_answered').eq('user_id', userData.user.id).eq('activity_date', dateKey()).maybeSingle();
  await supabase.from('daily_activity').upsert({ user_id: userData.user.id, activity_date: dateKey(), minutes: (existing?.minutes ?? 0) + minutes, lessons_completed: (existing?.lessons_completed ?? 0) + lessonsCompleted, exercises_answered: (existing?.exercises_answered ?? 0) + exercisesAnswered }, { onConflict: 'user_id,activity_date' });
}

export async function getActivitySummary() {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { streak: 0, todayMinutes: 0 };
  const { data, error } = await supabase.from('daily_activity').select('activity_date, minutes').eq('user_id', userData.user.id).order('activity_date', { ascending: false }).limit(60);
  if (error) throw new Error(`No se pudo cargar tu constancia: ${error.message}`);
  const dates = new Set((data ?? []).filter((item) => item.minutes > 0).map((item) => item.activity_date));
  let streak = 0; const cursor = new Date();
  if (!dates.has(dateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (dates.has(dateKey(cursor))) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
  return { streak, todayMinutes: data?.find((item) => item.activity_date === dateKey())?.minutes ?? 0 };
}
