'use client';

export default function Shop({ products, filter, onFilterChange, onAddToCart, onProductClick }) {
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <section id="shop">
      <div className="shop-header">
        <div>
          <p className="eyebrow">The Collection</p>
          <h2 style={{fontFamily:'var(--f-display)',fontSize:'clamp(2rem,3.5vw,2.8rem)',fontWeight:300}}>
            Shop All <em style={{fontStyle:'italic',color:'var(--sienna)'}}>Bostique</em>
          </h2>
        </div>
        <div className="filter-tabs">
          {['All', 'Duffel Bag', 'Carry Bag', 'Backpack', 'Cushion Cover'].map(f => (
            <button 
              key={f} 
              className={`filter-tab ${filter === f ? 'on' : ''}`}
              onClick={() => onFilterChange(f)}
            >
              {f === 'All' ? 'All' : 
               f === 'Duffel Bag' ? 'Duffel' : 
               f === 'Carry Bag' ? 'Carry' : 
               f === 'Cushion Cover' ? 'Cushion' : f}
            </button>
          ))}
        </div>
      </div>
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card" onClick={() => onProductClick(product)}>
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <span className="product-emoji">{product.emoji}</span>
              )}
              {product.badge && <span className="product-badge">{product.badge}</span>}
            </div>
            <div className="product-info">
              <p className="product-cat">{product.category}</p>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price.toLocaleString()}</p>
            </div>
            <button 
              className="product-add" 
              onClick={(e) => {e.stopPropagation(); onAddToCart(product)}}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}