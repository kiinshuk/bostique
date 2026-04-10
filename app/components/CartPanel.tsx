'use client';

export default function CartPanel({ cart, total, onClose, onUpdateQty, onRemove }) {
  const waNumber = '919084736334';
  
  function handleOrder() {
    const message = 'Order: ' + cart.map(i => `${i.name} x${i.qty}`).join(', ') + ` | Total: ₹${total}`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }

  return (
    <>
      <div className="overlay on" onClick={onClose}></div>
      <div className="cart-panel on">
        <div className="panel-head">
          <h3 className="panel-title">Your Bag</h3>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>
        <div className="panel-body">
          {cart.length === 0 ? (
            <p style={{textAlign:'center',color:'var(--stone)',padding:'40px'}}>Your bag is empty</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <span className="ci-emoji">{item.emoji}</span>
                <div className="ci-info">
                  <p className="ci-name">{item.name}</p>
                  <p className="ci-price">₹{item.price.toLocaleString()}</p>
                </div>
                <div className="ci-qty">
                  <button onClick={() => onUpdateQty(item.id, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="panel-foot">
            <div className="panel-total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <button className="order-wa" onClick={handleOrder}>💬 Order via WhatsApp</button>
          </div>
        )}
      </div>
    </>
  );
}