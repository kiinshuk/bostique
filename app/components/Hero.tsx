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
  bgImage: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(https://images.unsplash.com/photo-1473188588179-318e6d19e333?w=1920&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.4)',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
  },
  grain: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    margin: '0 auto',
    padding: '120px 48px 80px',
    textAlign: 'center',
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '24px',
    animation: 'slideUp 0.8s ease forwards',
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
    fontWeight: 300,
    lineHeight: 1.1,
    color: 'var(--color-white)',
    marginBottom: '24px',
    animation: 'slideUp 0.8s ease 0.2s forwards',
    opacity: 0,
  },
  highlight: {
    fontStyle: 'italic',
    color: 'var(--color-gold)',
  },
  desc: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.8,
    marginBottom: '40px',
    maxWidth: '500px',
    margin: '0 auto 40px',
    animation: 'slideUp 0.8s ease 0.4s forwards',
    opacity: 0,
  },
  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '16px 40px',
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
    animation: 'slideUp 0.8s ease 0.6s forwards',
    opacity: 0,
  },
  decorLine: {
    width: '60px',
    height: '1px',
    background: 'var(--color-gold)',
    margin: '48px auto 0',
  },
  scrollHint: {
    position: 'absolute',
    bottom: '40px',
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
    padding: '100px 20px 60px',
    position: 'relative',
  },
  mobileBg: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(https://images.unsplash.com/photo-1473188588179-318e6d19e333?w=800&q=60)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.35)',
  },
  mobileOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)',
  },
  mobileContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
  },
  mobileEyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    fontWeight: 500,
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '20px',
  },
  mobileH1: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    fontWeight: 300,
    lineHeight: 1.15,
    color: 'var(--color-white)',
    marginBottom: '16px',
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
    marginBottom: '28px',
    lineHeight: 1.6,
  },
  mobileBtn: {
    display: 'inline-block',
    padding: '14px 32px',
    background: 'var(--color-gold)',
    color: 'var(--color-black)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    border: 'none',
  },
};

export default function Hero({ isMobile }) {
  if (isMobile) {
    return (
      <section style={heroStyles.mobileSection}>
        <div style={heroStyles.mobileBg}></div>
        <div style={heroStyles.mobileOverlay}></div>
        <div style={heroStyles.mobileContent}>
          <p style={heroStyles.mobileEyebrow}>Est. 2026</p>
          <h1 style={heroStyles.mobileH1}>
            Leather Crafted<br />
            <span style={heroStyles.mobileHighlight}>with Purpose</span>
          </h1>
          <p style={heroStyles.mobileDesc}>
            Premium leather goods handcrafted for those<br />
            who appreciate timeless elegance.
          </p>
          <a href="#shop" style={heroStyles.mobileBtn}>Explore Collection</a>
        </div>
      </section>
    );
  }

  return (
    <section style={heroStyles.section}>
      <div style={heroStyles.bgImage}></div>
      <div style={heroStyles.overlay}></div>
      <div style={heroStyles.grain}></div>
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
        <a href="#shop" style={heroStyles.ctaBtn}>Explore Collection</a>
        <div style={heroStyles.decorLine}></div>
        <div style={heroStyles.scrollHint}>
          ↓ Discover
        </div>
      </div>
    </section>
  );
}