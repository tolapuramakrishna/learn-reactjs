const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const { mongoConnect } = require("./util/database");
const User = require("./models/user");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  User.findById("620248af163a0a09e7922655")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
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

mongoConnect(() => {
  console.log("mongoDB connected");
  app.listen(3000);
});
