import { supabase } from '../../../lib/supabase';

export async function savePronunciationAttempt({ targetText, transcript, wordScore }) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;
  const { error } = await supabase.from('pronunciation_attempts').insert({ user_id: userData.user.id, target_text: targetText, transcript, word_score: wordScore });
  if (error) throw new Error(`No se pudo guardar el intento: ${error.message}`);
}
