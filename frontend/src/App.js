import './App.css';
import { useEffect, useState } from 'react';
import ProductCatalog from './components/ProductCatalog';
import BasketSummary from './components/BasketSummary';
import './components/ProductCatalog.css';
import './components/BasketSummary.css';

function App() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [summary, setSummary] = useState(null);

  return (
   <div className="app">
      <header className="header">
        <h1>Acme Widget Co</h1>
        <p>Shopping Basket System</p>
      </header>
      <main className="container">
        <div className="layout">
          <section className="products">
            <ProductCatalog 
              products={products}
            />
          </section>
           <aside className="sidebar">
            <BasketSummary 
              items={basket}
              products={products}
              summary={summary}       
            />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
