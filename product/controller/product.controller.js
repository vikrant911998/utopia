const ProductModel = require("../model/product.model");
const utopiaDB = require("../../utils/db.util");

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

exports.getProductListPage = async (req, res) => {
  const userId = req.session.user.id;
  const dbProducts = await ProductModel.findAll({where : {userId}})
  const products = dbProducts.map(product=> product.dataValues);

  res.render("product/list", {
    pageTitle: "Product List | Utopia",
    path: "/product/list",
    isLogin: req.session.isLogin,
    user: req.session.user,
    products: products
  });
};

exports.postAddProduct = async (req, res) => {
  const { title, brand, price, description } = req.body;
  const { filename: image } = req.file;
  const userId = req.session.user ? req.session.user.id : null;
  const t = await utopiaDB.transaction();

  if(userId){
    try {
      await ProductModel.create(
        {
          title,
          brand,
          price,
          description,
          image,
          userId
        },
        { transaction: t }
      );
      await t.commit();
      res.redirect('/product/list');
    } catch (error) {
      await t.rollback();
      res.redirect('/product/add');
    }
  }
};
