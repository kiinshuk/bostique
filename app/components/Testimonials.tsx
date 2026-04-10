'use client';

const testiStyles = {
  section: {
    padding: '80px 80px',
    background: 'var(--color-cream-warm)',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '48px',
  },
  eyebrow: {
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    color: 'var(--color-text-muted)',
    marginBottom: '12px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 3vw, 2.5rem)',
    fontWeight: 300,
    color: 'var(--color-charcoal)',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '64px',
    alignItems: 'start',
  },
  intro: {},
  introTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 3vw, 2.5rem)',
    fontWeight: 300,
    lineHeight: 1.3,
    marginBottom: '20px',
  },
  introHighlight: {
    fontStyle: 'italic',
    color: 'var(--color-cognac)',
  },
  introBody: {
    fontSize: '1rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
    maxWidth: '400px',
  },
  ratingWrap: {
    marginTop: '32px',
    paddingTop: '28px',
    borderTop: '1px solid var(--color-border)',
  },
  stars: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.5rem',
    color: 'var(--color-gold)',
    lineHeight: 1,
  },
  ratingLabel: {
    fontSize: '0.72rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-text-secondary)',
    marginTop: '4px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  item: {
    display: 'flex',
    gap: '16px',
    padding: '24px',
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
  },
  initial: {
    width: '48px',
    height: '48px',
    background: 'var(--color-gold)',
    color: 'var(--color-white)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '1.1rem',
    flexShrink: 0,
  },
  itemContent: {},
  starsRow: {
    color: 'var(--color-gold)',
    fontSize: '0.9rem',
    marginBottom: '8px',
  },
  text: {
    fontSize: '0.95rem',
    color: 'var(--color-text-primary)',
    lineHeight: 1.5,
    marginBottom: '8px',
    fontStyle: 'italic',
  },
  author: {
    fontSize: '0.8rem',
    color: 'var(--color-text-secondary)',
  },
  mobileSection: {
    padding: '40px 20px',
    background: 'var(--color-cream-warm)',
  },
  mobileHeader: {
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  mobileEyebrow: {
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: 'var(--color-text-muted)',
    marginBottom: '8px',
  },
  mobileTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 300,
  },
  scrollWrap: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto' as React.CSSProperties['overflowX'],
    paddingBottom: '10px',
    scrollbarWidth: 'none' as React.CSSProperties['scrollbarWidth'],
  },
  card: {
    minWidth: '280px',
    padding: '20px',
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
  },
  cardInitial: {
    width: '40px',
    height: '40px',
    background: 'var(--color-gold)',
    color: 'var(--color-white)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    marginBottom: '12px',
  },
  cardText: {
    fontSize: '0.85rem',
    color: 'var(--color-text-primary)',
    marginBottom: '12px',
    lineHeight: 1.5,
    fontStyle: 'italic',
  },
  cardAuthor: {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
  },
  cardStars: {
    color: 'var(--color-gold)',
    fontSize: '0.9rem',
    marginTop: '8px',
  },
};

const testimonials = [
  { initial: 'R', text: "The leather backpack is absolutely stunning. Everyone at the office asks where I got it.", author: 'Rahul Mehta · Delhi' },
  { initial: 'P', text: "Ordered the duffel for my Goa trip — held everything perfectly!", author: 'Priya Sharma · Mumbai' },
  { initial: 'A', text: "The leather cushion covers transformed my living room. Rich texture!", author: 'Anjali Verma · Bangalore' },
];

export default function Testimonials({ isMobile }) {
  if (isMobile) {
    return (
      <section style={testiStyles.mobileSection}>
        <div style={testiStyles.mobileHeader}>
          <p style={testiStyles.mobileEyebrow}>CUSTOMER STORIES</p>
          <h2 style={testiStyles.mobileTitle}>What our customers say</h2>
        </div>
        <div style={testiStyles.scrollWrap}>
          {testimonials.map((t, i) => (
            <div key={i} style={testiStyles.card}>
              <div style={testiStyles.cardInitial}>{t.initial}</div>
              <p style={testiStyles.cardText}>"{t.text}"</p>
              <p style={testiStyles.cardAuthor}>{t.author}</p>
              <div style={testiStyles.cardStars}>★★★★★</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={testiStyles.section}>
      <div style={testiStyles.header}>
        <p style={testiStyles.eyebrow}>CUSTOMER STORIES</p>
        <h2 style={testiStyles.title}>What our customers say</h2>
      </div>
      <div style={testiStyles.layout}>
        <div style={testiStyles.intro}>
          <h3 style={testiStyles.introTitle}>
            Real people.<br /><em style={testiStyles.introHighlight}>Real stories.</em>
          </h3>
          <p style={testiStyles.introBody}>
            Our customers don't just buy bags — they invest in companions for their journeys. 
            Here's what some of them have to say.
          </p>
          <div style={testiStyles.ratingWrap}>
            <div style={testiStyles.stars}>★★★★★</div>
            <p style={testiStyles.ratingLabel}>5.0 Average Rating</p>
          </div>
        </div>
        <div style={testiStyles.list}>
          {testimonials.map((t, i) => (
            <div key={i} style={testiStyles.item}>
              <div style={testiStyles.initial}>{t.initial}</div>
              <div style={testiStyles.itemContent}>
                <div style={testiStyles.starsRow}>★★★★★</div>
                <p style={testiStyles.text}>"{t.text}"</p>
                <p style={testiStyles.author}>{t.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}