'use client';

const catStyles = {
  section: {
    padding: '80px 80px',
    background: 'var(--color-surface)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '48px',
  },
  headerLeft: {},
  eyebrow: {
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    color: 'var(--color-text-muted)',
    marginBottom: '8px',
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
    fontWeight: 300,
    color: 'var(--color-charcoal)',
  },
  viewAll: {
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '4px',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  },
  panel: {
    position: 'relative' as const,
    height: '320px',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    cursor: 'pointer',
    background: 'var(--color-cream-warm)',
  },
  bgArt: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.15,
    fontSize: '6rem',
    transition: 'all var(--transition-base)',
  },
  content: {
    position: 'relative' as const,
    zIndex: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-end',
    padding: '24px',
  },
  num: {
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    color: 'var(--color-gold)',
    marginBottom: '12px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    fontWeight: 400,
    color: 'var(--color-charcoal)',
    lineHeight: 1.3,
    marginBottom: '8px',
  },
  sub: {
    fontSize: '0.8rem',
    color: 'var(--color-text-secondary)',
    marginBottom: '16px',
  },
  arrow: {
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    color: 'var(--color-cognac)',
    fontWeight: 500,
  },
  mobileSection: {
    padding: '40px 20px',
    background: 'var(--color-surface)',
  },
  mobileHeader: {
    marginBottom: '20px',
  },
  mobileEyebrow: {
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: 'var(--color-text-muted)',
    marginBottom: '5px',
  },
  mobileH2: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 300,
  },
  scrollWrap: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto' as React.CSSProperties['overflowX'],
    paddingBottom: '10px',
    scrollbarWidth: 'none' as React.CSSProperties['scrollbarWidth'],
  },
  card: {
    minWidth: '140px',
    padding: '20px',
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    textAlign: 'center' as const,
    cursor: 'pointer',
    border: '1px solid var(--color-line)',
    transition: 'all var(--transition-base)',
  },
  cardIcon: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  cardName: {
    fontWeight: 500,
    fontSize: '0.85rem',
    color: 'var(--color-charcoal)',
  },
};

const catSubtitles: Record<string, string> = {
  'Duffel Bag': 'Weekend & Travel',
  'Carry Bag': 'Everyday Essentials',
  'Backpack': 'Work & Adventure',
  'Cushion Cover': 'Home Luxury',
};

export default function Categories({ categories, onCategoryClick, isMobile }) {
  if (isMobile) {
    return (
      <section style={catStyles.mobileSection}>
        <div style={catStyles.mobileHeader}>
          <p style={catStyles.mobileEyebrow}>BROWSE</p>
          <h2 style={catStyles.mobileH2}>Collections</h2>
        </div>
        <div style={catStyles.scrollWrap}>
          {categories.map(cat => (
            <div 
              key={cat.id} 
              onClick={() => onCategoryClick(cat.name)}
              style={catStyles.card}
            >
              <div style={catStyles.cardIcon}>{cat.icon}</div>
              <div style={catStyles.cardName}>{cat.name}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="categories" style={catStyles.section}>
      <div style={catStyles.header}>
        <div style={catStyles.headerLeft}>
          <p style={catStyles.eyebrow}>BROWSE</p>
          <h2 style={catStyles.h2}>All Collections</h2>
        </div>
        <a href="#shop" style={catStyles.viewAll}>View All →</a>
      </div>
      <div style={catStyles.grid}>
        {categories.map(cat => (
          <div key={cat.id} style={catStyles.panel} onClick={() => onCategoryClick(cat.name)}>
            <div style={catStyles.bgArt}>{cat.icon}</div>
            <div style={catStyles.content}>
              <span style={catStyles.num}>0{cat.id}</span>
              <h3 style={catStyles.title}>{cat.name}</h3>
              <p style={catStyles.sub}>{catSubtitles[cat.name] || ''}</p>
              <span style={catStyles.arrow}>Shop Now →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}