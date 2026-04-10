'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CACHE_KEYS = { user: 'bostique_user' };

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? JSON.parse(decodeURIComponent(match[2])) : null;
}

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const cookieUser = getCookie(CACHE_KEYS.user);
    if (!cookieUser) {
      router.push('/signin');
    } else {
      setUser(cookieUser);
    }
    setLoading(false);

    return () => window.removeEventListener('resize', checkMobile);
  }, [router]);

  function handleLogout() {
    document.cookie = 'bostique_user=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    router.push('/');
  }

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream-warm)' }}>
      <header style={{ background: 'var(--color-charcoal)', color: 'white', padding: '20px 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' }}>←</button>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '0.1em' }}>My Account</h1>
          <div style={{ width: '24px' }}></div>
        </div>
      </header>

      <div className="container" style={{ padding: isMobile ? '20px' : '40px 20px' }}>
        {/* Profile Card */}
        <div style={{ background: 'white', borderRadius: '16px', padding: isMobile ? '24px' : '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--color-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', fontWeight: 600 }}>
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '4px' }}>{user.name}</h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>{user.email}</p>
              {user.phone && <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{user.phone}</p>}
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div style={{ display: 'grid', gap: '16px' }}>
          <button onClick={() => router.push('/cart')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ fontSize: '1rem', fontWeight: 500 }}>🛒 My Bag</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>→</span>
          </button>

          <button onClick={() => router.push('/checkout')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ fontSize: '1rem', fontWeight: 500 }}>📦 Orders</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>→</span>
          </button>

          <button onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ fontSize: '1rem', fontWeight: 500 }}>🏠 Continue Shopping</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>→</span>
          </button>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          style={{ width: '100%', marginTop: '32px', padding: '16px', background: 'transparent', border: '1px solid var(--color-error)', borderRadius: '12px', color: 'var(--color-error)', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}