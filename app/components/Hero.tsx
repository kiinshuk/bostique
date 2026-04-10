'use client';

const heroStyles = {
  section: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    padding: '120px 80px 80px',
    background: 'var(--color-cream-warm)',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  left: {
    position: 'relative' as const,
    zIndex: 2,
  },
  label: {
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    color: 'var(--color-text-muted)',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  labelDot: {
    width: '40px',
    height: '1px',
    background: 'var(--color-gold)',
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
    fontWeight: 400,
    lineHeight: 1.1,
    color: 'var(--color-charcoal)',
    marginBottom: '32px',
  },
  highlight: {
    fontStyle: 'italic',
    color: 'var(--color-cognac)',
  },
  desc: {
    fontSize: '1.125rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.7,
    maxWidth: '480px',
    marginBottom: '48px',
  },
  ctaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '18px 36px',
    background: 'var(--color-charcoal)',
    color: 'var(--color-white)',
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    borderRadius: 'var(--radius-none)',
    cursor: 'pointer',
    transition: 'all var(--transition-base)',
    border: 'none',
  },
  scrollHint: {
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
    letterSpacing: '0.1em',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  right: {
    position: 'relative' as const,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualWrap: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '500px',
  },
  bagVisual: {
    width: '100%',
    aspectRatio: '4/5',
    background: 'linear-gradient(135deg, var(--color-cognac) 0%, var(--color-cognac-dark) 100%)',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-2xl)',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  bagHandle: {
    width: '80px',
    height: '40px',
    border: '4px solid var(--color-gold)',
    borderBottom: 'none',
    borderRadius: '40px 40px 0 0',
    position: 'absolute' as const,
    top: '60px',
  },
  bagBuckle: {
    width: '60px',
    height: '30px',
    background: 'var(--color-gold)',
    borderRadius: 'var(--radius-sm)',
    position: 'absolute' as const,
    top: '50%',
  },
  bagLabel: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    letterSpacing: '0.3em',
    color: 'var(--color-gold)',
    position: 'absolute' as const,
    bottom: '60px',
  },
  tags: {
    position: 'absolute' as const,
    top: '-20px',
    right: '-40px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  tag: {
    padding: '10px 16px',
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    color: 'var(--color-text-secondary)',
    boxShadow: 'var(--shadow-md)',
    whiteSpace: 'nowrap' as const,
  },
  counter: {
    position: 'absolute' as const,
    bottom: '40px',
    left: '-60px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  counterNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '3rem',
    color: 'var(--color-cognac)',
    lineHeight: 1,
  },
  counterLabel: {
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    color: 'var(--color-text-muted)',
    marginTop: '8px',
  },
  decorLine: {
    position: 'absolute' as const,
    bottom: '80px',
    right: '-80px',
    width: '120px',
    height: '1px',
    background: 'var(--color-gold)',
    transform: 'rotate(-45deg)',
  },
  mobileSection: {
    padding: '100px 20px 60px',
    background: 'var(--color-cream-warm)',
    minHeight: 'auto',
  },
  mobileLabel: {
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: 'var(--color-text-muted)',
    marginBottom: '12px',
  },
  mobileH1: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    fontWeight: 400,
    marginBottom: '16px',
    lineHeight: 1.2,
    color: 'var(--color-charcoal)',
  },
  mobileHighlight: {
    fontStyle: 'italic',
    color: 'var(--color-cognac)',
  },
  mobileDesc: {
    fontSize: '0.9rem',
    color: 'var(--color-text-secondary)',
    marginBottom: '24px',
    lineHeight: 1.5,
  },
  mobileVisual: {
    width: '200px',
    height: '240px',
    margin: '0 auto 24px',
    background: 'linear-gradient(135deg, var(--color-cognac) 0%, var(--color-cognac-dark) 100%)',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-xl)',
  },
  mobileBtn: {
    display: 'block',
    width: 'fit-content',
    margin: '0 auto',
    padding: '16px 32px',
    background: 'var(--color-charcoal)',
    color: 'var(--color-white)',
    fontSize: '0.85rem',
    fontWeight: 500,
    borderRadius: 'var(--radius-none)',
    cursor: 'pointer',
    border: 'none',
  },
  mobileStats: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: '1px solid var(--color-line)',
  },
  statItem: {
    textAlign: 'center' as const,
  },
  statValue: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: 'var(--color-charcoal)',
  },
  statLabel: {
    fontSize: '0.65rem',
    color: 'var(--color-text-muted)',
    letterSpacing: '0.1em',
    marginTop: '4px',
  },
};

export default function Hero({ isMobile }) {
  if (isMobile) {
    return (
      <section style={heroStyles.mobileSection}>
        <p style={heroStyles.mobileLabel}>01 / NEW COLLECTION 2026</p>
        <h1 style={heroStyles.mobileH1}>
          <span style={{ display: 'block' }}>Crafted to</span>
          <span style={{ ...heroStyles.mobileHighlight, display: 'block' }}>Carry Your Story</span>
        </h1>
        <p style={heroStyles.mobileDesc}>
          Premium bags and leather goods for those who move with intention.
        </p>
        <div style={heroStyles.mobileVisual}>
          <span style={{ fontSize: '4rem', color: 'var(--color-gold)' }}>🧳</span>
        </div>
        <button style={heroStyles.mobileBtn}>Explore Collection</button>
        <div style={heroStyles.mobileStats}>
          <div style={heroStyles.statItem}>
            <div style={heroStyles.statValue}>100%</div>
            <div style={heroStyles.statLabel}>LEATHER</div>
          </div>
          <div style={heroStyles.statItem}>
            <div style={heroStyles.statValue}>4+</div>
            <div style={heroStyles.statLabel}>COLLECTIONS</div>
          </div>
          <div style={heroStyles.statItem}>
            <div style={heroStyles.statValue}>⚡</div>
            <div style={heroStyles.statLabel}>FAST DELIVERY</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={heroStyles.section}>
      <div style={heroStyles.left}>
        <p style={heroStyles.label}>
          <span style={heroStyles.labelDot}></span>
          01 / New Collection 2026
        </p>
        <h1 style={heroStyles.h1}>
          <span style={{ display: 'block' }}>Crafted</span>
          <span style={{ display: 'block' }}>to Carry</span>
          <span style={{ ...heroStyles.highlight, display: 'block' }}>Your Story.</span>
        </h1>
        <p style={heroStyles.desc}>
          Premium bags and leather goods for those who move with intention. 
          Every stitch is deliberate. Every piece, a companion for life.
        </p>
        <div style={heroStyles.ctaRow}>
          <a href="#shop" style={heroStyles.ctaBtn}>
            Explore Collection
            <span>→</span>
          </a>
          <span style={heroStyles.scrollHint}>
            ↓ Scroll to discover
          </span>
        </div>
      </div>
      
      <div style={heroStyles.right}>
        <div style={heroStyles.visualWrap}>
          <div style={heroStyles.tags}>
            <span style={heroStyles.tag}>Genuine Leather</span>
            <span style={heroStyles.tag}>Artisan Made</span>
            <span style={heroStyles.tag}>India · 2026</span>
          </div>
          
          <div style={heroStyles.bagVisual}>
            <div style={heroStyles.bagHandle}></div>
            <div style={heroStyles.bagBuckle}></div>
            <span style={heroStyles.bagLabel}>BOSTIQUE</span>
          </div>
          
          <div style={heroStyles.counter}>
            <span style={heroStyles.counterNum}>04</span>
            <span style={heroStyles.counterLabel}>Collections</span>
          </div>
          
          <div style={heroStyles.decorLine}></div>
        </div>
      </div>
    </section>
  );
}