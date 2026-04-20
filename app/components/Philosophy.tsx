'use client';

const philStyles = {
  section: {
    padding: '120px 48px',
    background: 'var(--color-ivory)',
  },
  left: {
    marginBottom: '64px',
    textAlign: 'center' as const,
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '16px',
  },
  leftTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
    fontWeight: 300,
    color: 'var(--color-black)',
    lineHeight: 1.4,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
  },
  item: {
    padding: '40px 32px',
    background: 'var(--color-white)',
    textAlign: 'center' as const,
  },
  iconWrap: {
    fontSize: '1.5rem',
    color: 'var(--color-gold)',
    marginBottom: '20px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.1rem',
    fontWeight: 400,
    color: 'var(--color-black)',
    marginBottom: '12px',
  },
  body: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 400,
    color: 'var(--color-gray-500)',
    lineHeight: 1.7,
  },
  mobileSection: {
    padding: '60px 20px',
    background: 'var(--color-ivory)',
  },
  mobileHeader: {
    textAlign: 'center' as const,
    marginBottom: '32px',
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
    fontSize: '1.5rem',
    fontWeight: 300,
    color: 'var(--color-black)',
  },
  mobileGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  mobileItem: {
    padding: '24px 16px',
    background: 'var(--color-white)',
    textAlign: 'center' as const,
  },
  mobileIcon: {
    fontSize: '1.25rem',
    color: 'var(--color-gold)',
    marginBottom: '12px',
  },
  mobileItemTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.9rem',
    fontWeight: 400,
    color: 'var(--color-black)',
    marginBottom: '6px',
  },
  mobileItemDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    color: 'var(--color-gray-500)',
  },
};

const reasons = [
  { icon: '✦', title: 'Premium Materials', desc: 'Genuine leather, quality fabrics.' },
  { icon: '◈', title: 'Handcrafted', desc: 'Made by skilled artisans.' },
  { icon: '↗', title: 'Pan-India Delivery', desc: 'Fast shipping across India.' },
  { icon: '✓', title: 'WhatsApp Support', desc: 'Direct support via WhatsApp.' },
];

export default function Philosophy({ isMobile }) {
  if (isMobile) {
    return (
      <section style={philStyles.mobileSection}>
        <div style={philStyles.mobileHeader}>
          <p style={philStyles.mobileEyebrow}>Why Bostique</p>
          <h2 style={philStyles.mobileTitle}>Four reasons to choose us</h2>
        </div>
        <div style={philStyles.mobileGrid}>
          {reasons.map((item, i) => (
            <div key={i} style={philStyles.mobileItem}>
              <span style={philStyles.mobileIcon}>{item.icon}</span>
              <h3 style={philStyles.mobileItemTitle}>{item.title}</h3>
              <p style={philStyles.mobileItemDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={philStyles.section}>
      <div style={philStyles.left}>
        <p style={philStyles.eyebrow}>Why Bostique</p>
        <p style={philStyles.leftTitle}>Four reasons to carry something made to last.</p>
      </div>
      <div style={philStyles.grid}>
        {reasons.map((item, i) => (
          <div key={i} style={philStyles.item}>
            <div style={philStyles.iconWrap}>{item.icon}</div>
            <h3 style={philStyles.title}>{item.title}</h3>
            <p style={philStyles.body}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}