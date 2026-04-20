'use client';

const featStyles = {
  section: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '90vh',
    background: 'var(--color-black)',
    color: 'var(--color-white)',
  },
  visual: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--color-gray-900) 0%, var(--color-black) 100%)',
  },
  decoNum: {
    position: 'absolute' as const,
    top: '60px',
    left: '60px',
    fontFamily: 'var(--font-display)',
    fontSize: '8rem',
    color: 'rgba(201,169,98,0.08)',
    lineHeight: 1,
  },
  badge: {
    position: 'absolute' as const,
    top: '60px',
    left: '60px',
    padding: '10px 20px',
    background: 'var(--color-gold)',
    color: 'var(--color-black)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  bagVisual: {
    width: '320px',
    height: '420px',
    background: 'var(--color-charcoal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    padding: '80px',
    maxWidth: '560px',
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '20px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 4vw, 4rem)',
    fontWeight: 300,
    lineHeight: 1.15,
    marginBottom: '32px',
    color: 'var(--color-white)',
  },
  highlight: {
    fontStyle: 'italic',
    color: 'var(--color-gold)',
  },
  body: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.8,
    marginBottom: '16px',
  },
  price: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    fontWeight: 400,
    color: 'var(--color-gold)',
    marginBottom: '40px',
  },
  ctaRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap' as const,
  },
  primaryBtn: {
    padding: '18px 40px',
    background: 'var(--color-gold)',
    color: 'var(--color-black)',
    border: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  waBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '18px 40px',
    background: 'transparent',
    color: 'var(--color-white)',
    border: '1px solid rgba(255,255,255,0.3)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  mobileSection: {
    padding: '48px 20px',
    background: 'var(--color-black)',
    color: 'var(--color-white)',
  },
  mobileHeader: {
    marginBottom: '24px',
  },
  mobileEyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '8px',
  },
  mobileTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.75rem',
    fontWeight: 300,
    marginBottom: '16px',
    color: 'var(--color-white)',
  },
  mobileDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '16px',
    lineHeight: 1.6,
  },
  mobilePrice: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 400,
    color: 'var(--color-gold)',
    marginBottom: '20px',
  },
  mobileBtns: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  mobileAddBtn: {
    padding: '16px',
    background: 'var(--color-gold)',
    color: 'var(--color-black)',
    border: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  mobileWaBtn: {
    padding: '16px',
    background: 'transparent',
    color: 'var(--color-white)',
    border: '1px solid rgba(255,255,255,0.3)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
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
            WhatsApp Order
          </a>
        </div>
      </section>
    );
  }

  return (
    <section style={featStyles.section}>
      <div style={featStyles.visual}>
        <span style={featStyles.decoNum}>01</span>
        <span style={featStyles.badge}>Bestseller</span>
        <div style={featStyles.bagVisual}>
          <span style={{ fontSize: '6rem', opacity: 0.3 }}>🧳</span>
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
        <p style={featStyles.body}>
          This isn't just a bag. It's the one you'll still be carrying in twenty years.
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