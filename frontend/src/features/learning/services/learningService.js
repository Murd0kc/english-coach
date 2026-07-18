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

export async function getLessonById(lessonId) {
  const { data, error } = await supabase
    .from('lessons')
    .select(`id, title, description, duration_minutes, lesson_blocks (id, block_type, content, sort_order), exercises (id, exercise_type, prompt, explanation, correct_answer, difficulty, sort_order, exercise_options (id, option_text, is_correct, sort_order))`)
    .eq('id', lessonId)
    .eq('is_published', true)
    .single();

  if (error) throw new Error(`No se pudo cargar la lección: ${error.message}`);

  return {
    ...data,
    lesson_blocks: [...(data.lesson_blocks ?? [])].sort((a, b) => a.sort_order - b.sort_order),
    exercises: [...(data.exercises ?? [])].sort((a, b) => a.sort_order - b.sort_order),
  };
}
