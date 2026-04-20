'use client';

const catStyles = {
  section: {
    padding: '120px 48px',
    background: 'var(--color-white)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '64px',
    flexWrap: 'wrap' as const,
    gap: '24px',
  },
  headerLeft: {},
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '12px',
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 300,
    color: 'var(--color-black)',
    letterSpacing: '-0.02em',
  },
  viewAll: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-gray-500)',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  },
  panel: {
    position: 'relative' as const,
    aspectRatio: '3/4',
    background: 'var(--color-gray-50)',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute' as const,
    inset: 0,
    background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)',
    transition: 'opacity 0.4s ease',
  },
  content: {
    position: 'relative' as const,
    zIndex: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-end',
    padding: '32px',
  },
  num: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    color: 'var(--color-gold)',
    marginBottom: '12px',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.35rem',
    fontWeight: 400,
    color: 'var(--color-white)',
    lineHeight: 1.3,
    marginBottom: '8px',
  },
  sub: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.7)',
  },
  mobileSection: {
    padding: '60px 20px',
    background: 'var(--color-white)',
  },
  mobileHeader: {
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  mobileEyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '6px',
  },
  mobileH2: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 300,
    color: 'var(--color-black)',
  },
  scrollWrap: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto' as React.CSSProperties['overflowX'],
    paddingBottom: '12px',
    scrollbarWidth: 'none' as React.CSSProperties['scrollbarWidth'],
  },
  card: {
    minWidth: '140px',
    padding: '24px 16px',
    background: 'var(--color-gray-50)',
    textAlign: 'center' as const,
    cursor: 'pointer',
  },
  cardIcon: {
    fontSize: '1.75rem',
    marginBottom: '12px',
  },
  cardName: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.95rem',
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
            <div style={catStyles.overlay}></div>
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