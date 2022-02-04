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
            cart.totalPrice = cart.totalPrice + price
            fs.writeFile(p, JSON.stringify(cart))
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
}