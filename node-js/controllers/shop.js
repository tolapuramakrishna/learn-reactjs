const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.render("shop/product-list", {
        prods: data,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductById = (req, res, next) => {
  const id = req.params.productId;
  Product.findByPk(id).then((product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.render("shop/index", {
        prods: data,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.addToCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQty = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        //
        newQty = product.cartItem.quantity + 1;
        return product;
      } else {
        return Product.findByPk(prodId);
      }
    })
    .then((prod) => {
      return fetchedCart.addProduct(prod, {
        through: { quantity: newQty },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then((cart) => {
    cart
      .getProducts()
      .then((products) => {
        res
          .render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products,
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
  // Cart.getCart((cart) => {
  //   Product.fetchAll((prods) => {
  //     const cartProds = cart.products.map((p) => {
  //       return { ...prods.find((prod) => p.id === prod.id), qty: p.qty };
  //     });
  //     cart.products = cartProds;
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //       cart: cart,
  //     });
  //   });
  // });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((prod) => {
              prod.orderItem = { quantity: prod.cartItem.quantity };
              return prod;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: ["products"] }).then((orders) => {
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders,
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
