const express = require('express');
const path = require('path');
const adminController = require('../controllers/admin');
const router = express.Router();

const products = []
// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

exports.router = router
exports.products = products