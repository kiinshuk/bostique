'use client';

const featStyles = {
  section: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '80vh',
    background: 'var(--color-charcoal)',
    color: 'var(--color-white)',
  },
  visual: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--color-cognac-dark) 0%, var(--color-charcoal) 100%)',
    overflow: 'hidden',
  },
  decoNum: {
    position: 'absolute' as const,
    top: '40px',
    left: '40px',
    fontFamily: 'var(--font-display)',
    fontSize: '8rem',
    color: 'rgba(200, 169, 122, 0.1)',
    lineHeight: 1,
  },
  badge: {
    position: 'absolute' as const,
    top: '40px',
    right: '40px',
    padding: '8px 16px',
    background: 'var(--color-gold)',
    color: 'var(--color-charcoal)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    borderRadius: 'var(--radius-full)',
  },
  bagVisual: {
    width: '300px',
    height: '380px',
    background: 'var(--color-cognac)',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-2xl)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    padding: '80px',
  },
  eyebrow: {
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    color: 'rgba(250, 250, 248, 0.5)',
    marginBottom: '16px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
    fontWeight: 300,
    lineHeight: 1.2,
    marginBottom: '24px',
  },
  highlight: {
    fontStyle: 'italic',
    color: 'var(--color-gold)',
  },
  body: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 1.7,
    marginBottom: '16px',
    maxWidth: '480px',
  },
  price: {
    fontSize: '2rem',
    fontWeight: 600,
    color: 'var(--color-gold)',
    marginBottom: '32px',
  },
  ctaRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap' as const,
  },
  primaryBtn: {
    padding: '16px 32px',
    background: 'var(--color-surface)',
    color: 'var(--color-charcoal)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  },
  waBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 32px',
    background: '#25D366',
    color: 'var(--color-white)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.85rem',
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  },
  mobileSection: {
    padding: '40px 20px',
    background: 'var(--color-charcoal)',
    color: 'var(--color-white)',
  },
  mobileHeader: {
    marginBottom: '16px',
  },
  mobileEyebrow: {
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: 'rgba(250, 250, 248, 0.5)',
  },
  mobileTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 300,
    marginTop: '4px',
  },
  mobileDesc: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '16px',
    lineHeight: 1.6,
  },
  mobilePrice: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'var(--color-gold)',
    marginBottom: '16px',
  },
  mobileBtns: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  mobileAddBtn: {
    padding: '14px',
    background: 'var(--color-surface)',
    color: 'var(--color-charcoal)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
  },
  mobileWaBtn: {
    padding: '14px',
    background: '#25D366',
    color: 'var(--color-white)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.85rem',
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
          <span style={featStyles.mobileEyebrow}>EDITOR'S PICK</span>
          <h2 style={featStyles.mobileTitle}>
            The <em style={featStyles.highlight}>Expedition</em> Duffel
          </h2>
        </div>
        <p style={featStyles.mobileDesc}>
          Full-grain leather weekend bag with weatherproof canvas base.
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
            💬 Order on WhatsApp
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
          <span style={{ fontSize: '8rem' }}>🧳</span>
        </div>
      </div>
      <div style={featStyles.content}>
        <p style={featStyles.eyebrow}>EDITOR'S PICK</p>
        <h2 style={featStyles.title}>
          The <em style={featStyles.highlight}>Expedition</em><br />Duffel
        </h2>
        <p style={featStyles.body}>
          Our flagship piece — built for the journey, whatever it looks like. 
          Full-grain leather with weatherproof canvas base, YKK zippers, and a 
          padded shoulder strap that distributes weight like it was made for you. 
          Because it was.
        </p>
        <p style={featStyles.body}>
          This isn't just a bag. It's the one you'll still be carrying in twenty years.
        </p>
        <div style={featStyles.price}>₹3,499</div>
        <div style={featStyles.ctaRow}>
          <button 
            onClick={() => onAddToCart(featuredProduct)}
            style={featStyles.primaryBtn}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-gold)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface)'}
          >
            Add to Bag
          </button>
          <a 
            href="https://wa.me/919084736334?text=Hi%20Bostique!%20I%27m%20interested%20in%20the%20Expedition%20Duffel." 
            target="_blank"
            style={featStyles.waBtn}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            💬 Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}