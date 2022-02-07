const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;

















// ##############
// old code

/*

const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addToCart(id, price) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            const index = cart.products.findIndex(p => p.id === id)
            const product = cart.products[index]
            let updatedProd
            if (product) {
                updatedProd = { ...product }
                updatedProd.qty = updatedProd.qty + 1
                cart.products[index] = updatedProd
            } else {
                updatedProd = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProd]
            }
            cart.totalPrice = cart.totalPrice + +price
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                cb(JSON.parse(fileContent))
            } else {
                cb({ products: [], totalPrice: 0 })
            }
        })
    }

    static deleteById(id, price) {
        fs.readFile(p, (err, fileContent) => {
            let cart = JSON.parse(fileContent)
            const prod = cart.products.find(p => p.id === id)
            const prods = cart.products.filter(p => p.id !== id)
            const updatedPrice = cart.totalPrice - price * prod.qty
            const updatedCart = { products: prods, totalPrice: updatedPrice }
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }
}
*/