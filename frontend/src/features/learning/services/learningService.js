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
      ),
      lessons (
        id,
        title,
        description,
        duration_minutes,
        sort_order,
        is_published
      )
    `)
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(`No se pudo cargar la ruta: ${error.message}`);
  }

  return data.map((unit) => ({
    ...unit,
    lessons: (unit.lessons ?? [])
      .filter((lesson) => lesson.is_published)
      .sort((a, b) => a.sort_order - b.sort_order),
  }));
}
