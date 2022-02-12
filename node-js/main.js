const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const MONGO_URI =
  "mongodb+srv://ramakrishna:jH22J58mrH9a7ZR@nodejs-learning.mcpws.mongodb.net/shop";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const User = require("./models/user");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      collectionName: "sessions",
    }),
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log("error while setting user req"));
});

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn; // we need not add in every render method
  next();
});
app.use(flash());

app.use("/admin", adminData.router);
app.use(authRoutes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "404" });
});

mongoose.connect(MONGO_URI).then(() => {
  console.log("mongoDB connected");
  app.listen(3000);
});
