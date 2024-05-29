import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import './App.css';
import ProductForm from './ProductForm';
import AuthForm from './AuthForm';

function App() {
  // const [products, setProducts] = useState([{"productName": "Iphone", "category": "Tecnologia", "description": "Celular", "contact": "ciencias.unam", "price": 3, id: 1}])
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

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
  };

  const handleLogout = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Incluir credentials para enviar cookies
    });
    if (response.ok) {
      setIsLoggedIn(false);
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div>
        <button onClick={() => setIsLoginForm(true)}>Login</button>
        <button onClick={() => setIsLoginForm(false)}>Register</button>
        <AuthForm isLogin={isLoginForm} onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <ProductList products={products} updateProduct={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Crear Nuevo Producto</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ProductForm existingProduct={currentProduct} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
