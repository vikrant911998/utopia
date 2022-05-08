exports.getIndexPage = (req, res) => {
  res.render("index", {
    pageTitle: "Utopia",
    path: "/",
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
};

exports.getAddProductPage = (req, res) => {
  res.render("product/add", {
    pageTitle: "Add Product | Utopia",
    path: "/product/add",
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
};
