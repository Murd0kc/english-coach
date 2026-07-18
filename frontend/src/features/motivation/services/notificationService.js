import { supabase } from '../../../lib/supabase';

export async function getNotificationPreferences() {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;
  const { data, error } = await supabase.from('notification_preferences').select('enabled, reminder_time, timezone, weekly_summary').eq('user_id', userData.user.id).maybeSingle();
  if (error) throw new Error(`No se pudieron cargar tus preferencias: ${error.message}`);
  return data ?? { enabled: true, reminder_time: '19:00', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, weekly_summary: true };
}

export async function saveNotificationPreferences(preferences) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Necesitas iniciar sesión.');
  const { error } = await supabase.from('notification_preferences').upsert({ user_id: userData.user.id, ...preferences, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (error) throw new Error(`No se pudieron guardar tus preferencias: ${error.message}`);
}
