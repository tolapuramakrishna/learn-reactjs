const express = require('express');
const path = require('path');
const router = express.Router();

const products = []
router.use('/add-product',(req, res) =>{
    // res.sendFile(path.join(__dirname, '../', 'views', 'admin-view.html'))

    res.render('admin', {prods: products, pageTitle: 'Add product'})
})

router.post('/product',(req, res) =>{
    console.log(req.body)
    products.push({title: req.body.title})
    res.redirect('/')
})

exports.router = router
exports.products = products