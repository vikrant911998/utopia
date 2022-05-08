exports.getIndexPage = (req, res) => {
  res.render("index", {
    pageTitle: "Utopia",
    path: "/",
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
};
