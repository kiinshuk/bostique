'use client';

export default function Featured({ onAddToCart, isMobile }) {
  const featuredProduct = { id: 1, name: 'Expedition Duffel', category: 'Duffel Bag', price: 3499, emoji: '🧳', desc: 'Full-grain leather weekend bag.' };

  if (isMobile) {
    return (
      <section style={{ padding: '60px 20px', background: 'var(--color-black)', color: 'var(--color-white)' }}>
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px' }}>Editor's Pick</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 300, marginBottom: '16px' }}>
            The <em style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Expedition</em> Duffel
          </h2>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '16px', lineHeight: 1.6 }}>
          Full-grain leather weekend bag with refined craftsmanship.
        </p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--color-gold)', marginBottom: '20px' }}>₹3,499</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button onClick={() => onAddToCart(featuredProduct)} style={{ padding: '14px', background: 'var(--color-gold)', color: 'var(--color-black)', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Add to Bag
          </button>
          <a href="https://wa.me/919084736334?text=Hi%20Bostique!" target="_blank" style={{ padding: '14px', background: 'transparent', color: 'var(--color-white)', border: '1px solid rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', textDecoration: 'none' }}>
            WhatsApp Order
          </a>
        </div>
      </section>
    );
  }

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '90vh', background: 'var(--color-black)', color: 'var(--color-white)' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.6) saturate(1.2)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, transparent 100%)' }} />
        <span style={{ position: 'absolute', top: '60px', left: '60px', fontFamily: 'var(--font-display)', fontSize: '10rem', color: 'rgba(201,169,98,0.1)', lineHeight: 1 }}>01</span>
        <div style={{ position: 'relative', width: '360px', height: '480px', background: 'var(--color-charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(201,169,98,0.2)' }}>
          <span style={{ fontSize: '8rem', opacity: 0.4 }}>🧳</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', maxWidth: '600px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '20px' }}>Editor's Pick</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: '32px' }}>
          The <em style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Expedition</em><br />Duffel
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 400, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '16px' }}>
          Full-grain leather weekend bag with refined craftsmanship. Built to last, designed to age beautifully.
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 400, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '16px' }}>
          This isn't just a bag. It's the one you'll still be carrying in twenty years.
        </p>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, color: 'var(--color-gold)', marginBottom: '40px' }}>₹3,499</div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <button onClick={() => onAddToCart(featuredProduct)} style={{ padding: '16px 36px', background: 'var(--color-gold)', color: 'var(--color-black)', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s ease' }}>
            Add to Bag
          </button>
          <a href="https://wa.me/919084736334?text=Hi%20Bostique!" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 36px', background: 'transparent', color: 'var(--color-white)', border: '1px solid rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', cursor: 'pointer' }}>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}