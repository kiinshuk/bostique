'use client';

const philStyles = {
  section: {
    padding: '80px 48px',
    background: 'var(--color-white)',
  },
  left: {
    marginBottom: '48px',
    textAlign: 'center' as const,
  },
  eyebrow: {
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    color: 'var(--color-text-muted)',
    marginBottom: '12px',
    textTransform: 'uppercase',
  },
  leftTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
    fontWeight: 400,
    color: 'var(--color-black)',
    lineHeight: 1.4,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
  },
  item: {
    padding: '32px 24px',
    background: 'var(--color-gray-50)',
    borderRadius: '0',
    textAlign: 'center' as const,
  },
  iconWrap: {
    fontSize: '1.5rem',
    marginBottom: '16px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1rem',
    fontWeight: 400,
    color: 'var(--color-black)',
    marginBottom: '8px',
  },
  body: {
    fontSize: '0.85rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
  },
  mobileSection: {
    padding: '48px 20px',
    background: 'var(--color-white)',
  },
  mobileHeader: {
    marginBottom: '24px',
    textAlign: 'center' as const,
  },
  mobileEyebrow: {
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
    textTransform: 'uppercase',
  },
  mobileTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    fontWeight: 400,
    color: 'var(--color-black)',
  },
  mobileGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  mobileItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '8px',
    padding: '20px 12px',
    background: 'var(--color-gray-50)',
    borderRadius: '0',
    textAlign: 'center' as const,
  },
  mobileIcon: {
    fontSize: '1.25rem',
  },
  mobileItemTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.85rem',
    fontWeight: 400,
    color: 'var(--color-black)',
  },
  mobileItemDesc: {
    fontSize: '0.7rem',
    color: 'var(--color-text-secondary)',
  },
};

const reasons = [
  { icon: '✓', title: 'Premium Materials', desc: 'Genuine leather, quality fabrics.' },
  { icon: '✦', title: 'Handcrafted', desc: 'Made by skilled artisans.' },
  { icon: '↗', title: 'Pan-India Delivery', desc: 'Fast shipping across India.' },
  { icon: '◈', title: 'WhatsApp Support', desc: 'Direct support via WhatsApp.' },
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