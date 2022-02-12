const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth')

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);
router.post('/update-product', isAuth, adminController.postUpdateProduct);
router.post('/delete-product', isAuth, adminController.deleteProduct);
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

exports.router = router