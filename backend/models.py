from config import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(80), unique=False, nullable=False)
    category = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(120), unique=False, nullable=False)
    contact = db.Column(db.String(80), unique=False, nullable=False)
    price = db.Column(db.Integer, unique=False, nullable=False)

    def to_json(self):
        return{
            "id": self.id,
            "productName": self.product_name,
            "category": self.category,
            "description": self.description,
            "contact": self.contact,
            "price": self.price,
        }