const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log("error while setting user req"));
});

app.use("/admin", adminData.router);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res) => {
  // req.query
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "404" });
});

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// user.hasMany(product) // same as above

Cart.belongsTo(User); 
User.hasOne(Cart); // same as above
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//order
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, {through: OrderItem})

db
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({ name: "test", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart()
  })
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("error at starting");
  });
