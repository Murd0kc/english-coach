import { useState } from 'react';
import { signIn, signUp } from '../services/authService';
import './AuthPanel.css';

export function AuthPanel() {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        setMessage('Cuenta creada. Revisa tu correo si la confirmación está activada.');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-panel">
      <p className="eyebrow">Tu aprendizaje empieza aquí</p>
      <h1>{mode === 'signin' ? 'Continúa tu ruta de inglés.' : 'Crea tu cuenta gratuita.'}</h1>
      <p className="auth-intro">Guarda tu progreso y recibe una ruta adaptada a tus objetivos.</p>
      <form onSubmit={handleSubmit}>
        <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label>Contraseña<input type="password" minLength="6" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        <button className="primary-button auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Procesando...' : mode === 'signin' ? 'Iniciar sesión' : 'Crear cuenta'}</button>
      </form>
      {message && <p className="auth-message" role="status">{message}</p>}
      <button className="text-button auth-switch" type="button" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setMessage(''); }}>
        {mode === 'signin' ? '¿Aún no tienes cuenta? Crear una' : 'Ya tengo una cuenta'}
      </button>
    </section>
  );
}
