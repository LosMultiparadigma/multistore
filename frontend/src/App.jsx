import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import './App.css';
import ProductForm from './ProductForm';

function App() {
  // const [products, setProducts] = useState([{"productName": "Iphone", "category": "Tecnologia", "description": "Celular", "contact": "ciencias.unam", "price": 3, id: 1}])
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({})

  useEffect(() => {
    fetchProducts()
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("http://127.0.0.1:5000/products");
    const data = await response.json();
    setProducts(data.products);
    // console.log(data.products);
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentProduct({})
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    if (isModalOpen) return
    setCurrentProduct(product)
    setIsModalOpen(true)
  };

  const onUpdate = () => {
    closeModal()
    fetchProducts()
  }

  return (
    <>
      <ProductList products={products} updateProduct={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Crear Nuevo Producto</button>
      {isModalOpen && <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ProductForm existingProduct={currentProduct} updateCallback={onUpdate}/>
          </div>
        </div>
      }
    </>
  );
}

export default App;
