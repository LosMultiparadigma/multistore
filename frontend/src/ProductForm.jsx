import { useState } from "react";

const ProductForm = ({ existingProduct = {}, updateCallback }) => {
    const [productName, setProductName] = useState(existingProduct.productName || "");
    const [category, setCategory] = useState(existingProduct.category || "");
    const [description, setDescription] = useState(existingProduct.description || "");
    const [contact, setContact] = useState(existingProduct.contact || "");
    const [price, setPrice] = useState(existingProduct.price || "");

    const updating = Object.entries(existingProduct).length !== 0;

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            productName,
            category,
            description,
            contact,
            price
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_product/${existingProduct.id}` : "create_product")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const message = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="productName">Nombre del producto:</label>
                <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>

            <div>
                <label htmlFor="category">Categoría del producto:</label>
                <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>

            <div>
                <label htmlFor="description">Descripcion del producto:</label>
                <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div>
                <label htmlFor="contact">Contacto:</label>
                <input type="text" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>

            <div>
                <label htmlFor="price">Precio del producto:</label>
                <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            
            <button type="submit">{updating ? "Editar" : "Crear"}</button>
        </form> 
    );
};

export default ProductForm