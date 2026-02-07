function BasketSummary({ items, products, summary, onRemove, onDecrease, onClear }) {
  const getProductName = (code) => {
    const product = products.find(p => p.code === code);
    return product ? product.name : code;
  };

  return (
    <section className="basket-section">
      <div className="basket-header">
        <h2> Your Basket</h2>
        <span className="item-count">{items.length} items</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p>Your basket is empty</p>
          <p className="empty-hint">Add some widgets to get started</p>
        </div>
      ) : (
        <>
          <div className="basket-items-list">
            {items.map((item, index) => (
              <div key={item.code} className="basket-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="item-details">
                  <p className="item-name">{getProductName(item.code)}</p>
                  <p className="item-code">{item.code}</p>
                </div>
                <div className="item-actions">
                  <button
                    className="qty-decrease"
                    onClick={() => onDecrease(item.code)}
                    title="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button
                    className="qty-remove"
                    onClick={() => onRemove(item.code)}
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {summary && (
            <div className="summary-box">
              <div className="summary-row">
                <span>Subtotal</span>
                <span className="summary-value">${summary.subtotal.toFixed(2)}</span>
              </div>

              {summary.discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Offer Discount</span>
                  <span className="discount-value">−${summary.discount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Delivery</span>
                <span className="summary-value">${summary.delivery.toFixed(2)}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span>Total</span>
                <span className="total-value">${summary.total.toFixed(2)}</span>
              </div>
            </div>
          )}

          <button className="btn-clear" onClick={onClear}>
            <span></span> Clear Basket
          </button>
        </>
      )}
    </section>
  );
}

export default BasketSummary;
