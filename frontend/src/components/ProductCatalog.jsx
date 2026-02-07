function ProductCatalog({ products, onAdd }) {
  return (
    <section className="product-catalog">
      <div className="section-header">
        <h2>Products</h2>
        <p className="subtitle">Select items to add to your basket</p>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product.code} className="product-card">
            <div className="card-shine"></div>
            <div className="card-content">
              <div className="product-icon">
                {product.code === 'R01'}
                {product.code === 'G01'}
                {product.code === 'B01'}
              </div>
              
              <h3 className="product-name">{product.name}</h3>
              
              <span className="product-badge">{product.code}</span>
              
              <div className="product-divider"></div>
              
              <div className="price-section">
                <span className="price-label">Price:</span>
                <span className="price-value">${product.price.toFixed(2)}</span>
              </div>
              
              <button
                className="btn-add"
                onClick={() => onAdd(product.code)}
              >
                <span className="btn-icon">+</span>
                <span className="btn-text">Add to Basket</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductCatalog;
