const { validationResult } = require("express-validator");
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editable: false,
    hasError: false,
    errorMessage: null,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/edit-product",
      editable: false,
      hasError: true,
      errorMessage: error.array()[0].msg,
      product: {
        title,
        imageUrl,
        price,
        description,
      },
    });
  }
  const product = new Product({
    title,
    imageUrl,
    description,
    price,
    userId: req.user,
  });
  product
    .save()
    .then((resp) => {
      res.redirect("/");
    })
    .catch((err) => {
      const error = new Error(err)
      error.statusCode = 500;
      next(error);
    });
};

exports.postUpdateProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editable: true,
      hasError: true,
      errorMessage: error.array()[0].msg,
      product: {
        title,
        imageUrl,
        price,
        description,
        id,
      },
    });
  }
  Product.updateOne({ _id: id }, { title, imageUrl, description, price })
    .then((resp) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const edit = req.query.editable;
  if (!edit) {
    res.redirect("/");
  }
  Product.findById(prodId).then((product) => {
    if (!product) {
      res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editable: true,
      product: product,
      hasError: false,
      errorMessage: null,
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({ _id: prodId, userId: req.user._id }).then(() => {
    res.redirect("/");
  });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .populate("userId").exec()
    .then((data) => {
      res.render("admin/products", {
        prods: data,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
