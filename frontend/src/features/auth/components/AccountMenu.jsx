import { useState } from 'react';
import { signOut } from '../services/authService';
import './AccountMenu.css';

export function AccountMenu({ email }) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    try { await signOut(); } finally { setIsSigningOut(false); }
  }

  return (
    <div className="account-menu">
      <span title={email}>{email}</span>
      <button type="button" onClick={handleSignOut} disabled={isSigningOut}>
        {isSigningOut ? 'Saliendo...' : 'Salir'}
      </button>
    </div>
  );
}
