const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);
router.post('/update-product', adminController.postUpdateProduct);
router.post('/delete-product', adminController.deleteProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);

exports.router = router