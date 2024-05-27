import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import './App.css';
import ProductForm from './ProductForm';

function App() {
  // const [products, setProducts] = useState([{"productName": "Iphone", "category": "Tecnologia", "description": "Celular", "contact": "ciencias.unam", "price": 3, id: 1}])
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("http://127.0.0.1:5000/products");
    const data = await response.json();
    setProducts(data.products);
    console.log(data.products);
  };

  return (
    <>
      <ProductList products={products}/>
      <ProductForm/>
    </>
  );
}

export default App;
