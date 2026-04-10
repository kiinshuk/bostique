'use client';

const philStyles = {
  section: {
    padding: '80px 80px',
    background: 'var(--color-surface)',
  },
  left: {
    marginBottom: '48px',
  },
  eyebrow: {
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    color: 'var(--color-text-muted)',
    marginBottom: '12px',
  },
  leftTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
    fontWeight: 300,
    color: 'var(--color-charcoal)',
    maxWidth: '500px',
    lineHeight: 1.4,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
  },
  item: {
    padding: '32px 24px',
    background: 'var(--color-cream-warm)',
    borderRadius: 'var(--radius-lg)',
    transition: 'all var(--transition-base)',
  },
  iconWrap: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.125rem',
    fontWeight: 500,
    color: 'var(--color-charcoal)',
    marginBottom: '12px',
  },
  body: {
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
  },
  mobileSection: {
    padding: '40px 20px',
    background: 'var(--color-surface)',
  },
  mobileHeader: {
    marginBottom: '24px',
  },
  mobileEyebrow: {
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
  },
  mobileTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 300,
  },
  mobileGrid: {
    display: 'grid',
    gap: '12px',
  },
  mobileItem: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    background: 'var(--color-cream-warm)',
    borderRadius: 'var(--radius-lg)',
    alignItems: 'flex-start',
  },
  mobileIcon: {
    fontSize: '1.5rem',
  },
  mobileContent: {},
  mobileItemTitle: {
    fontSize: '0.95rem',
    fontWeight: 600,
    marginBottom: '4px',
    color: 'var(--color-charcoal)',
  },
  mobileItemDesc: {
    fontSize: '0.8rem',
    color: 'var(--color-text-secondary)',
  },
};

const reasons = [
  { icon: '🏅', title: 'Premium Materials', desc: 'Genuine leather, top-grade fabrics.' },
  { icon: '✂️', title: 'Artisan Crafted', desc: 'Hand-stitched by skilled craftsmen.' },
  { icon: '🚚', title: 'Pan-India Delivery', desc: 'Fast shipping across India.' },
  { icon: '💬', title: 'WhatsApp First', desc: 'Direct support via WhatsApp.' },
];

export default function Philosophy({ isMobile }) {
  if (isMobile) {
    return (
      <section style={philStyles.mobileSection}>
        <div style={philStyles.mobileHeader}>
          <p style={philStyles.mobileEyebrow}>WHY BOSTIQUE</p>
          <h2 style={philStyles.mobileTitle}>Four reasons to choose us</h2>
        </div>
        <div style={philStyles.mobileGrid}>
          {reasons.map((item, i) => (
            <div key={i} style={philStyles.mobileItem}>
              <span style={philStyles.mobileIcon}>{item.icon}</span>
              <div style={philStyles.mobileContent}>
                <h3 style={philStyles.mobileItemTitle}>{item.title}</h3>
                <p style={philStyles.mobileItemDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={philStyles.section}>
      <div style={philStyles.left}>
        <p style={philStyles.eyebrow}>WHY BOSTIQUE</p>
        <p style={philStyles.leftTitle}>Four reasons to carry something made to last.</p>
      </div>
      <div style={philStyles.grid}>
        {reasons.map((item, i) => (
          <div key={i} style={philStyles.item}>
            <div style={philStyles.iconWrap}>{item.icon}</div>
            <h3 style={philStyles.title}>{item.title}</h3>
            <p style={philStyles.body}>
              {item.desc}
              {i === 0 && ' We source only genuine leather and top-grade fabrics. No synthetic shortcuts.'}
              {i === 1 && ' Hand-stitched by craftsmen who treat every bag as their own.'}
              {i === 2 && ' Fast, tracked shipping across India. Order today, receive in 3–5 business days.'}
              {i === 3 && ' Order, query, or get support directly via WhatsApp. No bots.'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}