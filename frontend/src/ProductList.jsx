import React from "react";

const ProductList = ({ products, updateProduct, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_product/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

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
                            <button onClick={() => updateProduct(product)}>Update</button>
                            <button onClick={() => onDelete(product.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default ProductList