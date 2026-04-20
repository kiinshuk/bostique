'use client';

const testiStyles = {
  section: {
    padding: '120px 48px',
    background: 'var(--color-white)',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '64px',
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
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
    fontWeight: 300,
    color: 'var(--color-black)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  card: {
    padding: '40px',
    background: 'var(--color-ivory)',
    borderLeft: '2px solid var(--color-gold)',
  },
  stars: {
    fontFamily: 'var(--font-display)',
    fontSize: '1rem',
    color: 'var(--color-gold)',
    marginBottom: '20px',
    letterSpacing: '4px',
  },
  text: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    lineHeight: 1.7,
    marginBottom: '20px',
    fontStyle: 'italic',
  },
  author: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    color: 'var(--color-gray-500)',
    textTransform: 'uppercase',
  },
  ratingWrap: {
    marginTop: '48px',
    textAlign: 'center' as const,
  },
  ratingText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-gray-500)',
  },
  mobileSection: {
    padding: '60px 20px',
    background: 'var(--color-white)',
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
    marginBottom: '6px',
  },
  mobileTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 300,
    color: 'var(--color-black)',
  },
  scrollWrap: {
    display: 'flex',
    gap: '20px',
    overflowX: 'auto' as React.CSSProperties['overflowX'],
    paddingBottom: '12px',
    scrollbarWidth: 'none' as React.CSSProperties['scrollbarWidth'],
  },
  mobileCard: {
    minWidth: '260px',
    padding: '24px',
    background: 'var(--color-ivory)',
    borderLeft: '2px solid var(--color-gold)',
  },
  mobileCardStars: {
    fontSize: '0.85rem',
    color: 'var(--color-gold)',
    marginBottom: '16px',
    letterSpacing: '3px',
  },
  mobileCardText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--color-text-primary)',
    marginBottom: '16px',
    lineHeight: 1.6,
    fontStyle: 'italic',
  },
  mobileCardAuthor: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    color: 'var(--color-gray-500)',
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