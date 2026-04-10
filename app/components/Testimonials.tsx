'use client';

export default function Testimonials() {
  const testimonials = [
    { initial: 'R', text: "The leather backpack is absolutely stunning. The quality is unmatched — everyone at the office asks where I got it.", author: 'Rahul Mehta · Delhi' },
    { initial: 'P', text: "Ordered the duffel bag for my Goa trip — held everything perfectly and still looked stunning after three days of rough travel.", author: 'Priya Sharma · Mumbai' },
    { initial: 'A', text: "The leather cushion covers completely transformed my living room. Rich texture, perfect stitching, and they came beautifully packaged.", author: 'Anjali Verma · Bangalore' },
  ];

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