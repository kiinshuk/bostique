'use client';

const heroStyles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '120px 48px 80px',
    background: 'var(--color-white)',
    position: 'relative' as const,
  },
  content: {
    textAlign: 'center' as const,
    maxWidth: '720px',
  },
  eyebrow: {
    fontSize: '0.7rem',
    letterSpacing: '0.25em',
    color: 'var(--color-text-muted)',
    marginBottom: '24px',
    textTransform: 'uppercase',
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: 400,
    lineHeight: 1.1,
    color: 'var(--color-black)',
    marginBottom: '24px',
    letterSpacing: '-0.02em',
  },
  highlight: {
    fontStyle: 'italic',
    color: 'var(--color-gray-700)',
  },
  desc: {
    fontSize: '1rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.7,
    maxWidth: '520px',
    margin: '0 auto 40px',
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
    padding: '16px 32px',
    background: 'var(--color-black)',
    color: 'var(--color-white)',
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    borderRadius: '0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
  },
  linkBtn: {
    fontSize: '0.8rem',
    color: 'var(--color-text-secondary)',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  decorLine: {
    width: '60px',
    height: '1px',
    background: 'var(--color-gray-300)',
    margin: '48px auto 0',
  },
  mobileSection: {
    padding: '100px 24px 60px',
    background: 'var(--color-white)',
    minHeight: 'auto',
    textAlign: 'center' as const,
  },
  mobileEyebrow: {
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    color: 'var(--color-text-muted)',
    marginBottom: '16px',
    textTransform: 'uppercase',
  },
  mobileH1: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.25rem',
    fontWeight: 400,
    marginBottom: '16px',
    lineHeight: 1.15,
    color: 'var(--color-black)',
    letterSpacing: '-0.02em',
  },
  mobileHighlight: {
    fontStyle: 'italic',
    color: 'var(--color-gray-700)',
  },
  mobileDesc: {
    fontSize: '0.9rem',
    color: 'var(--color-text-secondary)',
    marginBottom: '28px',
    lineHeight: 1.6,
    maxWidth: '320px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mobileBtn: {
    display: 'inline-block',
    padding: '14px 28px',
    background: 'var(--color-black)',
    color: 'var(--color-white)',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    borderRadius: '0',
    cursor: 'pointer',
    border: 'none',
  },
  mobileLink: {
    display: 'block',
    marginTop: '16px',
    fontSize: '0.8rem',
    color: 'var(--color-text-secondary)',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  mobileDecor: {
    width: '40px',
    height: '1px',
    background: 'var(--color-gray-300)',
    margin: '32px auto 0',
  },
};

export default function Hero({ isMobile }) {
  if (isMobile) {
    return (
      <section style={heroStyles.mobileSection}>
        <p style={heroStyles.mobileEyebrow}>New Collection 2026</p>
        <h1 style={heroStyles.mobileH1}>
          Leather Goods<br />
          <span style={heroStyles.mobileHighlight}>Crafted for Life</span>
        </h1>
        <p style={heroStyles.mobileDesc}>
          Premium bags and leather accessories designed to age beautifully with you.
        </p>
        <a href="#shop" style={heroStyles.mobileBtn}>Shop Now</a>
        <a href="#shop" style={heroStyles.mobileLink}>Explore Collections →</a>
        <div style={heroStyles.mobileDecor}></div>
      </section>
    );
  }

  return (
    <section style={heroStyles.section}>
      <div style={heroStyles.content}>
        <p style={heroStyles.eyebrow}>New Collection 2026</p>
        <h1 style={heroStyles.h1}>
          Leather Goods<br />
          <span style={heroStyles.highlight}>Crafted for Life</span>
        </h1>
        <p style={heroStyles.desc}>
          Premium bags and leather accessories designed to age beautifully with you. 
          Timeless designs, exceptional quality.
        </p>
        <div style={heroStyles.ctaRow}>
          <a href="#shop" style={heroStyles.ctaBtn}>Shop Now</a>
          <a href="#shop" style={heroStyles.linkBtn}>Explore Collections</a>
        </div>
        <div style={heroStyles.decorLine}></div>
      </div>
    </section>
  );
}