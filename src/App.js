import { useEffect, useState } from 'react';
import './App.css';

import SearchIcon from './search.svg'
import ProductCard from './components/ProductCard';

const API_URL = 'https://desarrollojotaa.cl/api-products/api'


const App = () => {
  
  const [products, setProduct] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  

  const listProducst = async (pageNumber) => {
    const response = await fetch(`${API_URL}/products?page=${pageNumber}`);
    const data = await response.json();
    setCurrentPage(pageNumber);
    setProduct(data.products.data);
    //console.log(data.products);
  }

  const searchProducts = async (nameP, pageNumber) => {
    const response = await fetch(`${API_URL}/products/search/${nameP}?page=${pageNumber}`);
    const data = await response.json();
    setCurrentPage(pageNumber);
    setProduct(data.products.data)
  }

  const searchProductsId = async (id) => {
    const response = await fetch(`${API_URL}/product/${id}`);
    const data = await response.json();

    setProduct(data.product);
    
  }

  useEffect(() => {
    listProducst(currentPage);
    
  }, []);
  //console.log(currentPage);

  return (
    <div className="app">
      <h1 onClick={(e) => {setSearchBy(''); listProducst(1);} } >Jotaa products</h1>
      
      

      <div className="search">
        <input
          placeholder='Search product by name or description'
          
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        />
        <img 
          src={SearchIcon}
          alt="search"
          onClick={ (e) => {searchProducts(searchBy, currentPage); }}
          //onClick={searchBy !== Number ? () => searchProducts(searchBy) : () => searchProductsId(Number(searchBy))}
        />
      </div>

      {
        searchBy?.length > 0 ? (
          <div className='p'>
            <button className='pagination' onClick={() => {currentPage <1 ? setCurrentPage(1) : searchProducts(searchBy, currentPage-1)}}>Previous page</button>;
            <button className='pagination' onClick={(e) => {searchProducts(searchBy, currentPage+1)}}>Next  Page</button>;
          </div>

        ) : (
          <div className='p'>
            <button className='pagination' onClick={() => {currentPage <1 ? setCurrentPage(1) : listProducst(currentPage-1)}}>Previous page</button>;
            <button className='pagination' onClick={(e) => {listProducst(currentPage+1)}}>Next  Page</button>;
          </div>

        )
        
        

      }

      {
        products?.length > 0
          ? (
            <div className='container'>

              {products?.map((product) => (
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
