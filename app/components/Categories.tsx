'use client';

const catStyles = {
  section: {
    padding: '100px 48px',
    background: 'var(--color-white)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '48px',
    flexWrap: 'wrap',
    gap: '24px',
  },
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
  },
  viewAll: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-gray-500)',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  panel: {
    position: 'relative',
    aspectRatio: '3/4',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  bgImage: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.6s ease',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)',
    transition: 'opacity 0.4s ease',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '28px',
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
    fontSize: '1.3rem',
    fontWeight: 400,
    color: 'var(--color-white)',
    lineHeight: 1.3,
    marginBottom: '6px',
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
    marginBottom: '24px',
  },
  mobileHeader: {
    textAlign: 'center',
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
    overflowX: 'auto',
    paddingBottom: '12px',
  },
  card: {
    minWidth: '140px',
    padding: '20px 16px',
    background: 'var(--color-gray-50)',
    textAlign: 'center',
    cursor: 'pointer',
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

const catImages: Record<string, string> = {
  'Duffel Bag': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
  'Carry Bag': 'https://images.unsplash.com/photo-1590874103328-eac38a6356f1?w=600&q=80',
  'Backpack': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
  'Cushion Cover': 'https://images.unsplash.com/photo-1584100936595-c7654e5c7f39?w=600&q=80',
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
            <div key={cat.id} onClick={() => onCategoryClick(cat.name)} style={catStyles.card}>
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
        <div>
          <p style={catStyles.eyebrow}>Collections</p>
          <h2 style={catStyles.h2}>Browse by Category</h2>
        </div>
        <a href="#shop" style={catStyles.viewAll}>View All →</a>
      </div>
      <div style={catStyles.grid}>
        {categories.map(cat => (
          <div 
            key={cat.id} 
            style={catStyles.panel} 
            onClick={() => onCategoryClick(cat.name)}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('[data-bg]') as HTMLElement;
              if (img) img.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('[data-bg]') as HTMLElement;
              if (img) img.style.transform = 'scale(1)';
            }}
          >
            <div 
              data-bg 
              style={{
                ...catStyles.bgImage,
                backgroundImage: `url(${catImages[cat.name] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80'})`,
              }}
            />
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