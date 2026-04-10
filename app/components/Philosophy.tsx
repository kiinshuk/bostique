'use client';

export default function Philosophy({ isMobile }) {
  if (isMobile) {
    return (
      <section style={{ padding: '40px 20px', background: '#FAFAF8' }}>
        <div style={{ marginBottom: '25px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#6B6560', marginBottom: '5px' }}>Why Bostique</p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 300 }}>Four reasons to choose us</h2>
        </div>
        <div style={{ display: 'grid', gap: '15px' }}>
          {[
            { icon: '🏅', title: 'Premium Materials', desc: 'Genuine leather, top-grade fabrics.' },
            { icon: '✂️', title: 'Artisan Crafted', desc: 'Hand-stitched by skilled craftsmen.' },
            { icon: '🚚', title: 'Pan-India Delivery', desc: 'Fast shipping across India.' },
            { icon: '💬', title: 'WhatsApp First', desc: 'Direct support via WhatsApp.' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '15px', padding: '15px', background: 'white', borderRadius: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>{item.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#666' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="philosophy">
      <div className="phil-left">
        <p className="eyebrow">Why Bostique</p>
        <p className="phil-left-title">Four reasons to carry something made to last.</p>
      </div>
      <div className="phil-grid">
        <div className="phil-item">
          <div className="phil-icon-wrap">🏅</div>
          <h3 className="phil-title">Premium Materials</h3>
          <p className="phil-body">We source only genuine leather and top-grade fabrics. No synthetic shortcuts. Every material is chosen to age beautifully over years of use.</p>
        </div>
        <div className="phil-item">
          <div className="phil-icon-wrap">✂️</div>
          <h3 className="phil-title">Artisan Crafted</h3>
          <p className="phil-body">Hand-stitched by craftsmen who treat every bag as their own. Each piece passes through multiple quality checks before it reaches you.</p>
        </div>
        <div className="phil-item">
          <div className="phil-icon-wrap">🚚</div>
          <h3 className="phil-title">Pan-India Delivery</h3>
          <p className="phil-body">Fast, tracked shipping across India. Order today, receive in 3–5 business days. We pack every order with care and premium packaging.</p>
        </div>
        <div className="phil-item">
          <div className="phil-icon-wrap">💬</div>
          <h3 className="phil-title">WhatsApp First</h3>
          <p className="phil-body">We believe in human connection. Order, query, or get support directly via WhatsApp. No bots — just real people who care about your experience.</p>
        </div>
      </div>
    </section>
  );
}