import { useEffect, useState } from 'react';
import { getNotificationPreferences, saveNotificationPreferences } from '../services/notificationService';
import './NotificationPreferences.css';

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState(null); const [message, setMessage] = useState('');
  useEffect(() => { getNotificationPreferences().then(setPreferences).catch(() => {}); }, []);
  if (!preferences) return null;
  async function save(event) { event.preventDefault(); setMessage(''); try { await saveNotificationPreferences(preferences); setMessage('Preferencias guardadas.'); } catch (err) { setMessage(err.message); } }
  return <section className="notification-preferences"><p className="eyebrow">Constancia</p><h2>Recordatorios inteligentes</h2><p>Recibe un recordatorio amable cuando suelas tener tiempo para estudiar.</p><form onSubmit={save}><label><input type="checkbox" checked={preferences.enabled} onChange={(event) => setPreferences({ ...preferences, enabled: event.target.checked })} /> Activar recordatorios</label><label>Hora habitual<input type="time" value={preferences.reminder_time} onChange={(event) => setPreferences({ ...preferences, reminder_time: event.target.value })} /></label><label><input type="checkbox" checked={preferences.weekly_summary} onChange={(event) => setPreferences({ ...preferences, weekly_summary: event.target.checked })} /> Recibir resumen semanal</label><button className="secondary-button" type="submit">Guardar preferencias</button></form>{message && <small role="status">{message}</small>}</section>;
}
