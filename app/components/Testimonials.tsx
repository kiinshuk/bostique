'use client';

const testiStyles = {
  section: {
    padding: '80px 48px',
    background: 'var(--color-gray-50)',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '48px',
  },
  eyebrow: {
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    color: 'var(--color-text-muted)',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
    fontWeight: 400,
    color: 'var(--color-black)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  card: {
    padding: '32px',
    background: 'var(--color-white)',
    borderRadius: '0',
  },
  stars: {
    fontSize: '0.9rem',
    color: 'var(--color-black)',
    marginBottom: '16px',
    letterSpacing: '2px',
  },
  text: {
    fontSize: '0.95rem',
    color: 'var(--color-text-primary)',
    lineHeight: 1.6,
    marginBottom: '16px',
    fontStyle: 'italic',
  },
  author: {
    fontSize: '0.8rem',
    color: 'var(--color-text-muted)',
  },
  ratingWrap: {
    marginTop: '32px',
    textAlign: 'center' as const,
  },
  ratingText: {
    fontSize: '0.8rem',
    color: 'var(--color-text-secondary)',
  },
  mobileSection: {
    padding: '48px 20px',
    background: 'var(--color-gray-50)',
  },
  mobileHeader: {
    textAlign: 'center' as const,
    marginBottom: '24px',
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
  scrollWrap: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto' as React.CSSProperties['overflowX'],
    paddingBottom: '10px',
    scrollbarWidth: 'none' as React.CSSProperties['scrollbarWidth'],
  },
  mobileCard: {
    minWidth: '260px',
    padding: '24px',
    background: 'var(--color-white)',
    borderRadius: '0',
  },
  mobileCardStars: {
    fontSize: '0.8rem',
    color: 'var(--color-black)',
    marginBottom: '12px',
    letterSpacing: '2px',
  },
  mobileCardText: {
    fontSize: '0.85rem',
    color: 'var(--color-text-primary)',
    marginBottom: '12px',
    lineHeight: 1.5,
    fontStyle: 'italic',
  },
  mobileCardAuthor: {
    fontSize: '0.75rem',
    color: 'var(--color-text-muted)',
  },
};

const testimonials = [
  { text: "The leather backpack is absolutely stunning. Everyone at the office asks where I got it.", author: 'Rahul Mehta, Delhi' },
  { text: "Ordered the duffel for my Goa trip — held everything perfectly!", author: 'Priya Sharma, Mumbai' },
  { text: "The leather cushion covers transformed my living room. Rich texture!", author: 'Anjali Verma, Bangalore' },
];

export default function Testimonials({ isMobile }) {
  if (isMobile) {
    return (
      <section style={testiStyles.mobileSection}>
        <div style={testiStyles.mobileHeader}>
          <p style={testiStyles.mobileEyebrow}>Customer Stories</p>
          <h2 style={testiStyles.mobileTitle}>What our customers say</h2>
        </div>
        <div style={testiStyles.scrollWrap}>
          {testimonials.map((t, i) => (
            <div key={i} style={testiStyles.mobileCard}>
              <div style={testiStyles.mobileCardStars}>★★★★★</div>
              <p style={testiStyles.mobileCardText}>"{t.text}"</p>
              <p style={testiStyles.mobileCardAuthor}>{t.author}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={testiStyles.section}>
      <div style={testiStyles.header}>
        <p style={testiStyles.eyebrow}>Customer Stories</p>
        <h2 style={testiStyles.title}>What our customers say</h2>
      </div>
      <div style={testiStyles.grid}>
        {testimonials.map((t, i) => (
          <div key={i} style={testiStyles.card}>
            <div style={testiStyles.stars}>★★★★★</div>
            <p style={testiStyles.text}>"{t.text}"</p>
            <p style={testiStyles.author}>{t.author}</p>
          </div>
        ))}
      </div>
      <div style={testiStyles.ratingWrap}>
        <p style={testiStyles.ratingText}>5.0 Average Rating</p>
      </div>
    </section>
  );
}