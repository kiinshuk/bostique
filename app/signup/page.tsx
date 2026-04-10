'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function setCookie(name, value, days = 30) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires};path=/;SameSite=Lax`;
}

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setCookie('bostique_user', data.user);
        setSuccess(true);
        setTimeout(() => router.push('/'), 2000);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }

    setLoading(false);
  }

  if (success) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-cream-warm)', padding: '20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '12px' }}>Account Created!</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Welcome to Bostique. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--color-cream-warm)' }}>
      {/* Left Side - Image */}
      {!isMobile && (
        <div style={{ flex: 1, background: 'linear-gradient(135deg, var(--color-cognac) 0%, var(--color-cognac-dark) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center', color: 'white', padding: '40px', zIndex: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 300, marginBottom: '16px', letterSpacing: '0.1em' }}>BOSTIQUE</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Premium Leather Goods</p>
            <div style={{ marginTop: '40px', fontSize: '4rem' }}>👜</div>
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

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '1.75rem' : '2rem', marginBottom: '8px' }}>Create Account</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>Join us for exclusive access</p>

          {error && (
            <div style={{ padding: '12px 16px', background: 'rgba(155, 35, 53, 0.1)', border: '1px solid var(--color-error)', borderRadius: '8px', color: 'var(--color-error)', fontSize: '0.9rem', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500 }}>Full Name</label>
              <input 
                type="text" 
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--color-border)', borderRadius: '10px', fontSize: '1rem', background: 'white' }}
              />
            </div>

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
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 500 }}>Phone Number</label>
              <input 
                type="tel" 
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--color-text-secondary)' }}>
            Already have an account?{' '}
            <button onClick={() => router.push('/signin')} style={{ background: 'none', border: 'none', color: 'var(--color-cognac)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
              Sign In
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