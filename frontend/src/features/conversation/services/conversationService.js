import { supabase } from '../../../lib/supabase';

const conversationUrl = import.meta.env.VITE_CONVERSATION_FUNCTION_URL;

export async function createConversation(scenario, levelCode) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Necesitas iniciar sesión para practicar conversación.');
  const { data, error } = await supabase.from('conversation_sessions').insert({ user_id: userData.user.id, scenario, level_code: levelCode }).select('id').single();
  if (error) throw new Error(`No se pudo iniciar la conversación: ${error.message}`);
  return data;
}

export async function sendConversationMessage({ sessionId, scenario, levelCode, messages }) {
  if (!conversationUrl) throw new Error('La conversación con IA todavía no está configurada en este entorno.');
  const { data: session } = await supabase.auth.getSession();
  const response = await fetch(conversationUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.session?.access_token ?? ''}` }, body: JSON.stringify({ scenario, levelCode, messages }) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error ?? 'No se pudo obtener una respuesta.');
  const { data: userData } = await supabase.auth.getUser();
  await supabase.from('conversation_messages').insert([
    { session_id: sessionId, user_id: userData.user.id, role: 'user', content: messages.at(-1).content },
    { session_id: sessionId, user_id: userData.user.id, role: 'assistant', content: result.reply, correction: result.correction },
  ]);
  return result;
}
