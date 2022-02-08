const { ObjectId } = require("mongodb");

const getDB = require("../util/database").getDB;

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this._id = id;
    this.cart = cart;
  }

  save() {
    const db = getDB();
    db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const db = getDB();
    const cartProdIndex = this.cart?.items?.findIndex(
      (cp) => cp.productId.toString() === product._id.toString()
    );
    let updatedCartItems = [...this.cart?.items];
    if (cartProdIndex >= 0) {
      updatedCartItems[cartProdIndex].quantity =
        updatedCartItems[cartProdIndex].quantity + 1;
    } else {
      updatedCartItems.push({
        quantity: 1,
        productId: new ObjectId(product._id),
        name: product.title,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDB();
    const prodIds = this.cart.items.map((i) => i.productId);
    return db
      .collection("products")
      .find({ _id: { $in: prodIds } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            quantity: this.cart.items.find(
              (ci) => ci.productId.toString() === product._id.toString()
            ).quantity,
          };
        });
      });
  }

  deleteFromCart(id) {
    const db = getDB();
    const updatedCartItems = this.cart?.items?.filter(
      (cp) => cp.productId.toString() !== id.toString()
    );

    return db.collection("users").updateOne(
      { _id: new ObjectId(this._id) },
      {
        $set: {
          cart: {
            items: updatedCartItems,
          },
        },
      }
    );
  }

  createOrder() {
    const db = getDB();
    return this.getCart()
      .then((products) => {
        const order = {
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          },
          items: products,
        };
        return db.collection("orders").insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        return db.collection("users").updateOne(
          { _id: new ObjectId(this._id) },
          {
            $set: {
              cart: {
                items: [],
              },
            },
          }
        );
      });
  }

  getOrders() {
    const db = getDB();
    return db.collection("orders").find({ 'user._id': new ObjectId(this._id) }).toArray();
  }

  static findById(id) {
    const db = getDB();
    return db.collection("users").findOne({ _id: new ObjectId(id) });
  }
}

module.exports = User;
