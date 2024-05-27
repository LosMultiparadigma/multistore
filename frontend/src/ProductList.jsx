import React from "react";

const ProductList = ({products}) => {
    return <div>
        <h2>Productos</h2>
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Descripcion</th>
                    <th>Contacto</th>
                    <th>Precio</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.productName}</td>
                        <td>{product.category}</td>
                        <td>{product.description}</td>
                        <td>{product.contact}</td>
                        <td>{product.price}</td>
                        <td>
                            <button>Update</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default ProductList