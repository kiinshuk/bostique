'use client';

const heroStyles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'var(--color-black)',
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, var(--color-black) 0%, var(--color-gray-900) 50%, var(--color-black) 100%)',
  },
  pattern: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(201,169,98,0.08) 0%, transparent 50%),
                      radial-gradient(circle at 75% 75%, rgba(201,169,98,0.05) 0%, transparent 50%)`,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center' as const,
    padding: '0 48px',
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.5em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '32px',
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
    fontWeight: 300,
    lineHeight: 1.05,
    color: 'var(--color-white)',
    marginBottom: '32px',
    letterSpacing: '-0.02em',
  },
  highlight: {
    fontStyle: 'italic',
    color: 'var(--color-gold)',
  },
  desc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.8,
    marginBottom: '48px',
    maxWidth: '480px',
    margin: '0 auto 48px',
  },
  ctaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    flexWrap: 'wrap' as const,
  },
  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '18px 48px',
    background: 'var(--color-gold)',
    color: 'var(--color-black)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    border: 'none',
  },
  linkBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    padding: '18px 24px',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'all 0.3s ease',
  },
  decorLine: {
    width: '80px',
    height: '1px',
    background: 'var(--color-gold)',
    margin: '56px auto 0',
  },
  scrollHint: {
    position: 'absolute',
    bottom: '48px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    color: 'rgba(255,255,255,0.4)',
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  mobileSection: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--color-black)',
    padding: '120px 24px 80px',
    position: 'relative',
  },
  mobileBackground: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, var(--color-gray-900) 0%, var(--color-black) 100%)',
  },
  mobileContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center' as const,
  },
  mobileEyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    fontWeight: 500,
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '24px',
  },
  mobileH1: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.25rem',
    fontWeight: 300,
    lineHeight: 1.1,
    color: 'var(--color-white)',
    marginBottom: '20px',
  },
  mobileHighlight: {
    fontStyle: 'italic',
    color: 'var(--color-gold)',
  },
  mobileDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '32px',
    lineHeight: 1.6,
  },
  mobileBtn: {
    display: 'inline-block',
    padding: '16px 40px',
    background: 'var(--color-gold)',
    color: 'var(--color-black)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    border: 'none',
  },
  mobileLink: {
    display: 'block',
    marginTop: '20px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
  },
};

export default function Hero({ isMobile }) {
  if (isMobile) {
    return (
      <section style={heroStyles.mobileSection}>
        <div style={heroStyles.mobileBackground}></div>
        <div style={heroStyles.mobileContent}>
          <p style={heroStyles.mobileEyebrow}>Est. 2026</p>
          <h1 style={heroStyles.mobileH1}>
            Leather Crafted<br />
            <span style={heroStyles.mobileHighlight}>with Purpose</span>
          </h1>
          <p style={heroStyles.mobileDesc}>
            Premium leather goods handcrafted for those<br />
            who appreciate the art of timeless elegance.
          </p>
          <a href="#shop" style={heroStyles.mobileBtn}>Explore Collection</a>
          <a href="#philosophy" style={heroStyles.mobileLink}>Our Story</a>
        </div>
      </section>
    );
  }

  return (
    <section style={heroStyles.section}>
      <div style={heroStyles.background}></div>
      <div style={heroStyles.pattern}></div>
      <div style={heroStyles.content}>
        <p style={heroStyles.eyebrow}>Est. 2026</p>
        <h1 style={heroStyles.h1}>
          Leather Crafted<br />
          <span style={heroStyles.highlight}>with Purpose</span>
        </h1>
        <p style={heroStyles.desc}>
          Premium leather goods handcrafted for those who appreciate 
          the art of timeless elegance. Each piece tells a story of dedication, 
          quality, and refined taste.
        </p>
        <div style={heroStyles.ctaRow}>
          <a href="#shop" style={heroStyles.ctaBtn}>Explore Collection</a>
          <a href="#philosophy" style={heroStyles.linkBtn}>Our Story</a>
        </div>
        <div style={heroStyles.decorLine}></div>
        <div style={heroStyles.scrollHint}>
          ↓ Discover
        </div>
      </div>
    </section>
  );
}