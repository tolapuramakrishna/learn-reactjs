const express = require('express')
const path = require('path')
const shopController = require('../controllers/shop')

const adminData = require('./admin')
const router = express.Router()

// router.get('/', getProducts)

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProductById);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.addToCart);
router.get('/orders', shopController.getOrders);
router.post('/create-order', shopController.postOrder);
router.get('/checkout', shopController.getCheckout);

module.exports = router