import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ProductCatalog from './components/ProductCatalog';
import BasketSummary from './components/BasketSummary';
import './components/ProductCatalog.css';
import './components/BasketSummary.css';

function App() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.products);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Make sure the backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Calculate basket total whenever items change
  useEffect(() => {
    if (basket.length === 0) {
      setSummary(null);
      return;
    }

    const calculateTotal = async () => {
      try {
        const response = await axios.post('/api/basket/calculate', { items: basket });
        setSummary(response.data.summary);
      } catch (err) {
        console.error('Error calculating total:', err);
      }
    };

    calculateTotal();
  }, [basket]);

  const handleAddProduct = (code) => {
    const existing = basket.find(item => item.code === code);
    
    if (existing) {
      setBasket(basket.map(item =>
        item.code === code 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setBasket([...basket, { code, quantity: 1 }]);
    }
  };

  const handleRemoveProduct = (code) => {
    setBasket(basket.filter(item => item.code !== code));
  };

  const handleDecreaseQty = (code) => {
    setBasket(basket
      .map(item => 
        item.code === code 
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  const handleClear = () => {
    setBasket([]);
    setSummary(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Acme Widget Co</h1>
        <p>Shopping Basket System</p>
      </header>

      {error && <div className="error">{error}</div>}

      <main className="container">
        <div className="layout">
          <section className="products">
            <ProductCatalog 
              products={products}
              onAdd={handleAddProduct}
            />
          </section>

          <aside className="sidebar">
            <BasketSummary 
              items={basket}
              products={products}
              summary={summary}
              onRemove={handleRemoveProduct}
              onDecrease={handleDecreaseQty}
              onClear={handleClear}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
