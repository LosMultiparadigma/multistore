import { useState } from "react";

const ProductForm = ({ }) => {
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const [price, setPrice] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            productName,
            category,
            description,
            contact,
            price
        }
        const url = "http://127.0.0.1:5000/create_product"
        const options = {
            method: "POST",
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
            // Éxito
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
            
            <button type="submit">Agregar producto</button>
        </form> 
    );
};

export default ProductForm