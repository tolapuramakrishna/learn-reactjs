const { ObjectId } = require("mongodb");

const getDB = require("../util/database").getDB;
class Product {
  constructor(title, imageUrl, description, price, id, uid) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id = id;
    this.userId = uid
  }

  save() {
    const db = getDB();
    let op;
    const {_id , ...otherData} = this
    if (this._id) {
      op = db
        .collection("products")
        .updateOne({ _id: new ObjectId(this._id) }, { $set: otherData });
    } else {
      op = db.collection("products").insertOne(otherData);
    }
    return op;
  }

  static getProducts() {
    const db = getDB();
    return db.collection("products").find().toArray();
  }

  static findById(prodId) {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new ObjectId(prodId) })
      .next();
  }

  static deleteById(id) {
    const db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) })
  }
}

module.exports = Product;
