import { supabase } from '../../../lib/supabase';

export async function getContentAnalytics() {
  const { data, error } = await supabase.rpc('get_content_analytics');
  if (error) throw new Error(`No se pudo cargar la analítica: ${error.message}`);
  return data;
}
