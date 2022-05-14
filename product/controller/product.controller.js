const ProductModel = require("../model/product.model");
const utopiaDB = require("../../utils/db.util");

exports.getIndexPage = async (req, res) => {
  const dbProducts = await ProductModel.findAll({ });
  const products = dbProducts.map((product) => product.dataValues);
  res.render("index", {
    pageTitle: "Utopia",
    path: "/",
    isLogin: req.session.isLogin,
    user: req.session.user,
    featuredProducts: products.slice(0, 8),
    newProducts: products.slice(products.length - 8),
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
  const dbProducts = await ProductModel.findAll({ where: { userId } });
  const products = dbProducts.map((product) => product.dataValues);
  res.render("product/list", {
    pageTitle: "Product List | Utopia",
    path: "/product/list",
    isLogin: req.session.isLogin,
    user: req.session.user,
    products: products,
  });
};

exports.postDeleteProduct = async (req, res) => {
  const productId = req.body.productId;
  const t = await utopiaDB.transaction();
  try {
    await ProductModel.destroy(
      {
        where: {
          id: productId,
        },
      },
      { transaction: t }
    );
    await t.commit();
    res.redirect("/product/list");
  } catch (error) {
    await t.rollback();
    res.redirect("/product/list");
  }
};

exports.getEditProduct = async (req, res) => {
  console.log(req.query);
  const { id } = req.query;
  const dbProducts = await ProductModel.findAll({ where: { id } });
  const products = dbProducts.map((product) => product.dataValues);
  res.render("product/edit", {
    pageTitle: "Edit Product | Utopia",
    isLogin: req.session.isLogin,
    user: req.session.user,
    product: products[0],
    path: "product/edit",
  });
};

exports.postAddProduct = async (req, res) => {
  const { title, brand, price, description } = req.body;
  const { filename: image } = req.file;
  const userId = req.session.user ? req.session.user.id : null;
  const t = await utopiaDB.transaction();

  if (userId) {
    try {
      await ProductModel.create(
        {
          title,
          brand,
          price,
          description,
          image,
          userId,
        },
        { transaction: t }
      );
      await t.commit();
      res.redirect("/product/list");
    } catch (error) {
      await t.rollback();
      res.redirect("/product/add");
    }
  }
};

exports.postUpdateProduct = async (req, res) => {
  const { title, brand, price, description, id } = req.body;
  const { filename: image } = req.file ? req.file: {};
  console.log(image);
  const newProductObj = {
    title,
    brand,
    price, 
    description
  };
  if(image){
    newProductObj.image = image;
  }
  const t = await utopiaDB.transaction();
  try {
    await ProductModel.update(
      newProductObj,
      {
        where: {
          id
        }
      },
      { transaction: t }
    );
    await t.commit();
    res.redirect("/product/list");
  } catch (error) {
    await t.rollback();
    res.redirect("/product/list");
  }

};
