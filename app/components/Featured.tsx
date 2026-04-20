'use client';

const featStyles = {
  section: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '80vh',
    background: 'var(--color-black)',
    color: 'var(--color-white)',
  },
  visual: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--color-gray-900)',
    overflow: 'hidden',
  },
  decoNum: {
    position: 'absolute' as const,
    top: '40px',
    left: '40px',
    fontFamily: 'var(--font-display)',
    fontSize: '6rem',
    color: 'rgba(255,255,255,0.08)',
    lineHeight: 1,
  },
  bagVisual: {
    width: '280px',
    height: '360px',
    background: 'var(--color-gray-700)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    padding: '80px',
  },
  eyebrow: {
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '16px',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
    fontWeight: 400,
    lineHeight: 1.2,
    marginBottom: '24px',
    color: 'var(--color-white)',
  },
  highlight: {
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.7)',
  },
  body: {
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.7,
    marginBottom: '16px',
    maxWidth: '420px',
  },
  price: {
    fontSize: '1.75rem',
    fontWeight: 500,
    color: 'var(--color-white)',
    marginBottom: '32px',
  },
  ctaRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap' as const,
  },
  primaryBtn: {
    padding: '14px 28px',
    background: 'var(--color-white)',
    color: 'var(--color-black)',
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
  waBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    background: 'transparent',
    color: 'var(--color-white)',
    border: '1px solid rgba(255,255,255,0.3)',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease',
  },
  mobileSection: {
    padding: '48px 20px',
    background: 'var(--color-black)',
    color: 'var(--color-white)',
  },
  mobileHeader: {
    marginBottom: '16px',
  },
  mobileEyebrow: {
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
  },
  mobileTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 400,
    marginTop: '4px',
    color: 'var(--color-white)',
  },
  mobileDesc: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '16px',
    lineHeight: 1.6,
  },
  mobilePrice: {
    fontSize: '1.25rem',
    fontWeight: 500,
    color: 'var(--color-white)',
    marginBottom: '16px',
  },
  mobileBtns: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  mobileAddBtn: {
    padding: '14px',
    background: 'var(--color-white)',
    color: 'var(--color-black)',
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  mobileWaBtn: {
    padding: '14px',
    background: 'transparent',
    color: 'var(--color-white)',
    border: '1px solid rgba(255,255,255,0.3)',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textAlign: 'center' as const,
    textDecoration: 'none',
  },
};

export default function Featured({ onAddToCart, isMobile }) {
  const featuredProduct = { id: 1, name: 'Expedition Duffel', category: 'Duffel Bag', price: 3499, emoji: '🧳', desc: 'Full-grain leather weekend bag.' };

  if (isMobile) {
    return (
      <section style={featStyles.mobileSection}>
        <div style={featStyles.mobileHeader}>
          <span style={featStyles.mobileEyebrow}>Editor's Pick</span>
          <h2 style={featStyles.mobileTitle}>
            The <em style={featStyles.highlight}>Expedition</em> Duffel
          </h2>
        </div>
        <p style={featStyles.mobileDesc}>
          Full-grain leather weekend bag with refined craftsmanship.
        </p>
        <p style={featStyles.mobilePrice}>₹3,499</p>
        <div style={featStyles.mobileBtns}>
          <button 
            onClick={() => onAddToCart(featuredProduct)}
            style={featStyles.mobileAddBtn}
          >
            Add to Bag
          </button>
          <a 
            href="https://wa.me/919084736334?text=Hi%20Bostique!%20I%27m%20interested%20in%20the%20Expedition%20Duffel."
            target="_blank"
            style={featStyles.mobileWaBtn}
          >
            WhatsApp
          </a>
        </div>
      </section>
    );
  }

  return (
    <section style={featStyles.section}>
      <div style={featStyles.visual}>
        <span style={featStyles.decoNum}>01</span>
        <div style={featStyles.bagVisual}>
          <span style={{ fontSize: '6rem', opacity: 0.5 }}>🧳</span>
        </div>
      </div>
      <div style={featStyles.content}>
        <p style={featStyles.eyebrow}>Editor's Pick</p>
        <h2 style={featStyles.title}>
          The <em style={featStyles.highlight}>Expedition</em><br />Duffel
        </h2>
        <p style={featStyles.body}>
          Full-grain leather weekend bag with refined craftsmanship. 
          Built to last, designed to age beautifully.
        </p>
        <div style={featStyles.price}>₹3,499</div>
        <div style={featStyles.ctaRow}>
          <button 
            onClick={() => onAddToCart(featuredProduct)}
            style={featStyles.primaryBtn}
          >
            Add to Bag
          </button>
          <a 
            href="https://wa.me/919084736334?text=Hi%20Bostique!%20I%27m%20interested%20in%20the%20Expedition%20Duffel." 
            target="_blank"
            style={featStyles.waBtn}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}