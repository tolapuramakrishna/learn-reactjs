const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { getErrorMessage } = require("../util/shared");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
const msg = {
  to: "ram2rakhi@gmail.com", // Change to your recipient
  from: "ramakrishnatolapu.dev@gmail.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

exports.login = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: errors.array()[0].msg,
    });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "email or password not valid");
        return res.redirect("/login");
      }
      return bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(() => {
            res.redirect("/");
          });
        } else {
          req.flash("error", "email or password not valid");
          res.redirect("/login");
        }
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};

exports.signup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    pageTitle: "signup",
    path: "/signup",
    errorMessage: message,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      pageTitle: "signup",
      path: "/signup",
      errorMessage: errors.array()[0].msg,
    });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        req.flash(
          "error",
          "E-Mail exists already, please pick a different one."
        );
        return res.redirect("/signup");
      } else {
        bcrypt
          .hash(password, 12)
          .then((pwd) => {
            const user = new User({
              email,
              password: pwd,
              cart: { items: [] },
            });
            return user.save();
          })
          .then(() => {
            res.redirect("/login");
            return sgMail.send(msg);
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

exports.reset = (req, res, next) => {
  res.render("auth/rest", {
    pageTitle: "Reset",
    path: "/reset",
    errorMessage: getErrorMessage(req),
  });
};

exports.sendResetLink = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};

exports.updatePassword = (req, res, next) => {
  res.render("auth/new-password", {
    pageTitle: "New password",
    path: "/new-password",
    errorMessage: getErrorMessage(req),
  });
};

exports.postUpdatePassword = (req, res, next) => {};
