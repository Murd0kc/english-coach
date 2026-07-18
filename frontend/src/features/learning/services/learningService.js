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

export async function recordAnswer(exerciseId, answer, isCorrect) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw new Error('Necesitas iniciar sesión para guardar tu respuesta.');

  const { error } = await supabase.from('user_answers').insert({
    user_id: userData.user.id,
    exercise_id: exerciseId,
    answer: { selected_option_id: answer.id, selected_text: answer.option_text },
    is_correct: isCorrect,
  });

  if (error) throw new Error(`No se pudo guardar la respuesta: ${error.message}`);

  const { data: exercise, error: exerciseError } = await supabase
    .from('exercises')
    .select('lesson_id')
    .eq('id', exerciseId)
    .single();

  if (exerciseError) throw new Error(`No se pudo identificar la lección: ${exerciseError.message}`);

  const { data: existingProgress } = await supabase
    .from('user_progress')
    .select('attempts')
    .eq('user_id', userData.user.id)
    .eq('lesson_id', exercise.lesson_id)
    .maybeSingle();

  const { error: progressError } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userData.user.id,
      lesson_id: exercise.lesson_id,
      status: 'in_progress',
      attempts: (existingProgress?.attempts ?? 0) + 1,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' });

  if (progressError) throw new Error(`No se pudo guardar el progreso: ${progressError.message}`);
}
