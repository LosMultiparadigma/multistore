from flask import request, jsonify
from config import app, db
from models import Product

@app.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    json_products = list(map(lambda x: x.to_json(), products))
    return jsonify({"products": json_products})

@app.route("/create_product", methods=["POST"])
def create_product():
    product_name = request.json.get("productName")
    category = request.json.get("category")
    description = request.json.get("description")
    contact = request.json.get("contact")
    price = request.json.get("price")

    if not product_name or not category or not description or not contact or not price:
        return (
            jsonify({"message": "Debes incluir un nombre, una categoría, una descripción, un contacto y un precio"}),
            400,
        )
    
    new_product = Product(product_name=product_name, category=category, description=description, contact=contact, price=price)
    try:
        db.session.add(new_product)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User created!"}), 201

@app.route("/update_product/<int:user_id>", methods=["PATCH"])
def update_product(user_id):
    product = Product.query.get(user_id)

    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404
    
    data = request.json
    product.product_name = data.get("productName", product.product_name)
    product.category = data.get("category", product.category)
    product.description = data.get("description", product.description)
    product.contact = data.get("contact", product.contact)
    product.price = data.get("price", product.price)

    db.session.commit()

    return jsonify({"message": "Producto actualizado"}), 201

@app.route("/delete_product/<int:user_id>", methods=["DELETE"])
def delete_product(user_id):
    product = Product.query.get(user_id)

    if not product:
        return jsonify({"message": "Producto no encontrado"}), 404
    
    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Producto eliminado"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)