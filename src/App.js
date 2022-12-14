import { useEffect, useState } from 'react';
import './App.css';

import SearchIcon from './search.svg'
import ProductCard from './components/productCard';

const API_URL = 'https://desarrollojotaa.cl/api-products/api'





const App = () => {

  const [products, setProduct] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  

  const listProducst = async () => {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();

    setProduct(data.products)
  }

  const searchProducts = async (nameP) => {
    const response = await fetch(`${API_URL}/products/search/${nameP}`);
    const data = await response.json();
    
    setProduct(data.products)
  }

  const searchProductsId = async (id) => {
    const response = await fetch(`${API_URL}/product/${id}`);
    const data = await response.json();

    setProduct(data.product);
    
  }

  useEffect(() => {
    listProducst();
    
    
    
  }, []);

  return (
    <div className="app">
      <h1 onClick={(e) => {setSearchBy(''); listProducst();} } >Jotaa products</h1>
      

      <div className="search">
        <input
          placeholder='Search product by name or description'
          
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        />
        <img 
          src={SearchIcon}
          alt="search"
          onClick={ () => {searchProductsId(searchBy); searchProducts(searchBy); }}
          //onClick={searchBy !== Number ? () => searchProducts(searchBy) : () => searchProductsId(Number(searchBy))}
        />
      </div>

      {
        products?.length > 0
          ? (
            <div className='container'>

              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
      
            </div>
          ) : (
            <div className='empty'>
              <h2>No product found</h2>
            </div>
          )
      } 
     </div>
  );
}

export default App;
