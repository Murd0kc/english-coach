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

export async function reviewCard(cardId, quality) {
  const { data: card, error: readError } = await supabase
    .from('review_cards')
    .select('repetitions, ease_factor')
    .eq('id', cardId)
    .single();
  if (readError) throw new Error(readError.message);

  const repetitions = quality >= 3 ? card.repetitions + 1 : 0;
  const easeFactor = Math.max(1.3, card.ease_factor + (quality >= 3 ? 0.1 : -0.2));
  const days = quality >= 3 ? Math.max(1, Math.round(repetitions === 1 ? 1 : repetitions === 2 ? 3 : 7 * easeFactor)) : 0;
  const nextReview = new Date(Date.now() + days * 86400000).toISOString();

  const { error } = await supabase.from('review_cards').update({
    repetitions,
    ease_factor: easeFactor,
    next_review_at: nextReview,
    last_reviewed_at: new Date().toISOString(),
  }).eq('id', cardId);
  if (error) throw new Error(error.message);
}
