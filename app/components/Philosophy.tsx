'use client';

export default function Philosophy() {
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