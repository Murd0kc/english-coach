import { supabase } from '../../../lib/supabase';

export async function getLearningPath() {
  const { data, error } = await supabase
    .from('units')
    .select(`
      id,
      title,
      objective,
      theme,
      sort_order,
      levels (
        code,
        name,
        sort_order
      )
    `)
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(`No se pudo cargar la ruta: ${error.message}`);
  }

  return data;
}