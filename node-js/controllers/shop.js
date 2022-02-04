const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProductById = (req, res, next) => {
  const id = req.params.productId
  Product.getById(id, product => {
    console.log(product)
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.addToCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.getById(prodId, product => {
    console.log(product)
    if(product) {
      Cart.addToCart(prodId, product.price)
      res.redirect('/cart');
    }
    res.statusCode(401).send('invalid data')
  })
}

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      cart: cart
    });
  })
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
