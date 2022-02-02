const { Product } = require("../models/product")


exports.getAddProduct = (req, res) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'admin-view.html'))
    res.render('admin', { pageTitle: 'Add product' })
}

exports.postAddProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/')
}

exports.getProducts = (req, res) => {
    // res.send('<p> welcome </p>')
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop-view.html'))
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });

}