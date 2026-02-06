import './App.css';
import { useEffect, useState } from 'react';
import ProductCatalog from './components/ProductCatalog';
import './components/ProductCatalog.css';

function App() {
  const [products, setProducts] = useState([]);

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
           
        </div>
      </main>
    </div>
  );
}

export default App;
