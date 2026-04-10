'use client';

export default function Testimonials({ isMobile }) {
  const testimonials = [
    { initial: 'R', text: "The leather backpack is absolutely stunning. Everyone at the office asks where I got it.", author: 'Rahul Mehta · Delhi' },
    { initial: 'P', text: "Ordered the duffel for my Goa trip — held everything perfectly!", author: 'Priya Sharma · Mumbai' },
    { initial: 'A', text: "The leather cushion covers transformed my living room. Rich texture!", author: 'Anjali Verma · Bangalore' },
  ];

  if (isMobile) {
    return (
      <section style={{ padding: '40px 20px', background: '#F4F1EC' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#6B6560', marginBottom: '15px', textAlign: 'center' }}>Customer Stories</p>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 300, textAlign: 'center', marginBottom: '25px' }}>What our customers say</h2>
        <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ minWidth: '280px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ width: '40px', height: '40px', background: '#C8A97A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, marginBottom: '12px' }}>{t.initial}</div>
              <p style={{ fontSize: '0.85rem', color: '#333', marginBottom: '12px', lineHeight: 1.5 }}>"{t.text}"</p>
              <p style={{ fontSize: '0.75rem', color: '#666' }}>{t.author}</p>
              <div style={{ color: '#C8A97A', fontSize: '0.9rem', marginTop: '8px' }}>★★★★★</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials">
      <div className="eyebrow">Customer Stories</div>
      <div className="testi-layout">
        <div className="testi-intro">
          <h2 className="testi-intro-title">Real people.<br/><em>Real stories.</em></h2>
          <p className="testi-intro-body">Our customers don't just buy bags — they invest in companions for their journeys. Here's what some of them have to say.</p>
          <div style={{marginTop:32,paddingTop:28,borderTop:'1px solid var(--line)'}}>
            <p style={{fontFamily:'var(--f-display)',fontSize:'2.5rem',fontWeight:300,color:'var(--sand)'}}>★★★★★</p>
            <p style={{fontSize:'.72rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--stone)',marginTop:4}}>5.0 Average Rating</p>
          </div>
        </div>
        <div className="testi-list">
          {testimonials.map((t, i) => (
            <div key={i} className="testi-item">
              <div className="testi-initial">{t.initial}</div>
              <div>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">"{t.text}"</p>
                <p className="testi-author">{t.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}