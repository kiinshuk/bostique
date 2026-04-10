'use client';

import { useState } from 'react';

export default function AdminLogin({ onClose, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    if (username === 'admin' && password === 'bostique2026') {
      onLogin(true);
    } else {
      setError('Incorrect credentials.');
    }
  }

  return (
    <div id="admin-login" className="on">
      <div className="login-card">
        <div className="login-logo">BOSTIQUE</div>
        <p className="login-sub">Admin Panel</p>
        <div className="login-field">
          <label>Username</label>
          <input type="text" placeholder="admin" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="login-field">
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        </div>
        <button className="login-submit" onClick={handleLogin}>Sign In</button>
        <p className="login-err" style={{display: error ? 'block' : 'none'}}>{error}</p>
        <p className="login-back"><a onClick={onClose}>← Back to website</a></p>
      </div>
    </div>
  );
}