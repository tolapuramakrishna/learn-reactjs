exports.login = (req, res, next) => {
  res.render("/auth/login", { pageTitle: "Login", path: "/login" });
};

exports.postLogin = (req, res, next) => {
    res.render("/auth/login", { pageTitle: "Login", path: "/login" });
  };
  