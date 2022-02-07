const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editable: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title,
    imageUrl,
    description,
    price,
    userId: req.user.id
  })
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
  // const product = new Product(null, title, imageUrl, description, price);
  // product.save();
};

exports.postUpdateProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.update(
    {
      title,
      imageUrl,
      description,
      price,
    },
    {
      where: { id: id },
    }
  ).then((resp) => {
    res.redirect("/");
  });
  // const product = new Product(id, title, imageUrl, description, price);
  // product.save();
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const edit = req.query.editable;
  if (!edit) {
    res.redirect("/");
  }
  Product.findByPk(prodId).then((product) => {
    if (!product) {
      res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editable: true,
      product: product,
    });
  });
  // Product.getById(prodId, (product) => {
  //   if (!product) {
  //     res.redirect('/')
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editable: true,
  //     product: product
  //   });
  // })
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.destroy({ where: { id: prodId } }).then(() => {
    res.redirect("/");
  });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.render("admin/products", {
        prods: data,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
