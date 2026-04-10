'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const CACHE_KEYS = { user: 'bostique_user' };

function setCookie(name, value, days = 30) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires};path=/;SameSite=Lax`;
}

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setCookie(CACHE_KEYS.user, data.user);
        router.push('/');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong');
    }

    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--color-cream-warm)' }}>
      {/* Left Side - Image */}
      {!isMobile && (
        <div style={{ flex: 1, background: 'linear-gradient(135deg, var(--color-cognac) 0%, var(--color-cognac-dark) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center', color: 'white', padding: '40px', zIndex: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 300, marginBottom: '16px', letterSpacing: '0.1em' }}>BOSTIQUE</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Premium Leather Goods</p>
            <div style={{ marginTop: '40px', fontSize: '4rem' }}>🧳</div>
          </div>
          <div style={{ position: 'absolute', bottom: '40px', left: '40px', fontSize: '0.8rem', opacity: 0.7 }}>
            Crafted to Carry Your Story
          </div>
        </div>
      )}

      {/* Right Side - Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px' : '60px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {isMobile && (
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.15em', marginBottom: '8px' }}>BOSTIQUE</h1>
              <p style={{ color: 'var(--color-text-secondary)' }}>Premium Leather Goods</p>
            </div>
          )}

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '1.75rem' : '2rem', marginBottom: '8px' }}>Welcome Back</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>Sign in to continue</p>

          {error && (
            <div style={{ padding: '12px 16px', background: 'rgba(155, 35, 53, 0.1)', border: '1px solid var(--color-error)', borderRadius: '8px', color: 'var(--color-error)', fontSize: '0.9rem', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500 }}>Email</label>
              <input 
                type="email" 
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '1rem', background: 'white' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500 }}>Password</label>
              <input 
                type="password" 
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '1rem', background: 'white' }}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '16px', background: 'var(--color-charcoal)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '10px' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--color-text-secondary)' }}>
            Don't have an account?{' '}
            <button onClick={() => router.push('/signup')} style={{ background: 'none', border: 'none', color: 'var(--color-cognac)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
              Sign Up
            </button>
          </p>

          <button onClick={() => router.push('/')} style={{ display: 'block', margin: '32px auto 0', background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
            ← Back to Store
          </button>
        </div>
      </div>
    </div>
  );
}