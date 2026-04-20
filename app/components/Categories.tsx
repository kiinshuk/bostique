'use client';

const catStyles = {
  section: {
    padding: '80px 48px',
    background: 'var(--color-white)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '48px',
    flexWrap: 'wrap' as const,
    gap: '16px',
  },
  headerLeft: {},
  eyebrow: {
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    color: 'var(--color-text-muted)',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
    fontWeight: 400,
    color: 'var(--color-black)',
    letterSpacing: '-0.02em',
  },
  viewAll: {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  },
  panel: {
    position: 'relative' as const,
    aspectRatio: '3/4',
    borderRadius: '0',
    overflow: 'hidden',
    cursor: 'pointer',
    background: 'var(--color-gray-50)',
  },
  bgImage: {
    position: 'absolute' as const,
    inset: 0,
    background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)',
    transition: 'opacity 0.3s ease',
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
    letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    fontWeight: 400,
    color: 'var(--color-white)',
    lineHeight: 1.3,
    marginBottom: '4px',
  },
  sub: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.7)',
  },
  mobileSection: {
    padding: '48px 20px',
    background: 'var(--color-white)',
  },
  mobileHeader: {
    marginBottom: '20px',
  },
  mobileEyebrow: {
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
    textTransform: 'uppercase',
  },
  mobileH2: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 400,
    color: 'var(--color-black)',
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
    padding: '24px 16px',
    background: 'var(--color-gray-50)',
    borderRadius: '0',
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  cardIcon: {
    fontSize: '1.75rem',
    marginBottom: '12px',
  },
  cardName: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.9rem',
    fontWeight: 400,
    color: 'var(--color-black)',
  },
};

const catSubtitles: Record<string, string> = {
  'Duffel Bag': 'Travel',
  'Carry Bag': 'Everyday',
  'Backpack': 'Work',
  'Cushion Cover': 'Home',
};

export default function Categories({ categories, onCategoryClick, isMobile }) {
  if (isMobile) {
    return (
      <section style={catStyles.mobileSection}>
        <div style={catStyles.mobileHeader}>
          <p style={catStyles.mobileEyebrow}>Collections</p>
          <h2 style={catStyles.mobileH2}>Browse</h2>
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
          <p style={catStyles.eyebrow}>Collections</p>
          <h2 style={catStyles.h2}>Browse by Category</h2>
        </div>
        <a href="#shop" style={catStyles.viewAll}>View All →</a>
      </div>
      <div style={catStyles.grid}>
        {categories.map(cat => (
          <div key={cat.id} style={catStyles.panel} onClick={() => onCategoryClick(cat.name)}>
            <div style={catStyles.bgImage}></div>
            <div style={catStyles.content}>
              <span style={catStyles.num}>0{cat.id}</span>
              <h3 style={catStyles.title}>{cat.name}</h3>
              <p style={catStyles.sub}>{catSubtitles[cat.name] || ''}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}