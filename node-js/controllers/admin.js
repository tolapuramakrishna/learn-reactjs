const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editable: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  console.log('save')
  product.save();
  res.redirect('/');
};

exports.postUpdateProduct = (req, res, next) => {
  const id = req.body.productId
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const edit = req.query.editable
  if(!edit) {
    res.redirect('/')
  }
  Product.getById(prodId, (product) => {
    if(!product) {
      res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editable: true,
      product: product
    });
  })
}

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([row, fields])=>{
    res.render('admin/products', {
      prods: row,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });

  })
  .catch(err => console.log(err))
};
