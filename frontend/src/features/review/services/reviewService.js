import { supabase } from '../../../lib/supabase';

export async function getDueReviewCards() {
  const { data, error } = await supabase
    .from('review_cards')
    .select('id, source_type, front_content, back_content, repetitions, next_review_at')
    .lte('next_review_at', new Date().toISOString())
    .order('next_review_at', { ascending: true });
  if (error) throw new Error(`No se pudieron cargar los repasos: ${error.message}`);
  return data;
}
