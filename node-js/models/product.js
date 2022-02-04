const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

  }

  static deleteById(id) {

  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
    
  }

  static getById(id) {

  }
};




/* // with json file 
const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      console.log('model save')
      if (this.id) {
        console.log('model save', this.id)
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString()
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const existingProduct = products.find(
        prod => prod.id === id
      );
      const updatedProducts = products.filter(
        prod => prod.id !== id
      );
      Cart.deleteById(id, existingProduct.price)
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
      });
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static getById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id == id)
      cb(product)
    });
  }
};

*/