const ProductModel = require("../../product/model/product.model");
const CartModel = require("../model/cart.model");

exports.addProductInCart = async (req, res) => {
  const userId = req.session.user.id;
  const productId = req.body.productId;
  const dbProduct = await ProductModel.findOne({ where: { id: productId } });
  const product = dbProduct.dataValues;
  const cart = await CartModel.findOne({ where: { userId } });
  try {
    if (!cart) {
      product.qty = 1;
      await CartModel.create({
        products: JSON.stringify([product]),
        totalPrice: product.price,
        userId: userId,
      });
      res.redirect('/product/shop');
    } else if (cart) {
      const previousCart = cart.dataValues;
      const previousProducts = JSON.parse(previousCart.products);
      const index = previousProducts.findIndex(pd=>pd.id == product.id);

      if(index === -1) {
        product.qty = 1;
        previousProducts.push(product);
        let totalPrice = 0;
        previousProducts.forEach(pd=>{
          totalPrice += (pd.price*pd.qty);
        });
        await CartModel.update({
          products: JSON.stringify([...previousProducts]),
          totalPrice: totalPrice,
          userId: userId,
        }, { where : { userId: userId }});
        res.redirect('/product/shop');
      } else {
        
        previousProducts[index].qty += 1;
        let totalPrice = 0;
        previousProducts.forEach(pd=>{
          totalPrice += (pd.price*pd.qty);
        });
        await CartModel.update({
          products: JSON.stringify([...previousProducts]),
          totalPrice: totalPrice,
          userId: userId,
        }, { where : { userId: userId }});
        res.redirect('/product/shop');
      }
    }
  } catch (error) {
    console.log(error);
  }
};