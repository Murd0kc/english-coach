import { useState } from 'react';
import { createConversation, sendConversationMessage } from '../services/conversationService';
import './ConversationCoach.css';

const scenarios = [{ id: 'cafe', label: 'En una cafetería' }, { id: 'travel', label: 'En un hotel' }, { id: 'work', label: 'Presentación laboral' }];

export function ConversationCoach({ levelCode = 'A1' }) {
  const [scenario, setScenario] = useState('cafe');
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  async function send(event) {
    event.preventDefault();
    if (!draft.trim() || isSending) return;
    setError(''); setIsSending(true);
    try {
      const id = sessionId ?? (await createConversation(scenario, levelCode)).id;
      const nextMessages = [...messages, { role: 'user', content: draft.trim() }];
      const result = await sendConversationMessage({ sessionId: id, scenario, levelCode, messages: nextMessages });
      setSessionId(id); setMessages([...nextMessages, { role: 'assistant', content: result.reply, correction: result.correction }]); setDraft('');
    } catch (err) { setError(err.message); } finally { setIsSending(false); }
  }
  return <section className="conversation-coach" aria-labelledby="conversation-title"><div className="section-heading"><div><p className="eyebrow">Práctica real</p><h2 id="conversation-title">Habla con tu coach</h2></div><span>IA · {levelCode}</span></div><div className="scenario-picker">{scenarios.map((item) => <button key={item.id} type="button" className={scenario === item.id ? 'scenario active' : 'scenario'} onClick={() => { setScenario(item.id); setSessionId(null); setMessages([]); }}>{item.label}</button>)}</div><div className="conversation-log">{!messages.length && <p className="conversation-empty">Escribe una frase en inglés para comenzar. El coach te responderá y corregirá solo lo importante.</p>}{messages.map((message, index) => <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}><p>{message.content}</p>{message.correction && <small><strong>Mejor opción:</strong> {message.correction.better}<br />{message.correction.explanation}</small>}</div>)}</div><form onSubmit={send} className="conversation-form"><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write in English..." aria-label="Tu mensaje en inglés" /><button className="primary-button" type="submit" disabled={isSending}>{isSending ? '...' : 'Enviar'}</button></form>{error && <p role="alert">{error}</p>}</section>;
}
