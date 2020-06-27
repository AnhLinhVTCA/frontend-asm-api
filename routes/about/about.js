const express = require("express");
const categoryServices = require("../../service/categoryServices");
const productServices = require("../../service/productServices");
const cartServices = require("../../service/cartServices");
const router = express.Router();

router.get("/", async (req, res, next) => {
  let total = 0;
  try {
    const allProductInCart = [];
    const allCategories = await categoryServices.getAllCategories();
    const listProductInCart = cartServices.getListProductInCart(req, "@cart");
    for (const productInCart of listProductInCart) {
      let product = await productServices.getProductById(productInCart.id);
      total += productInCart.quantity * product.price;
      allProductInCart.push(product);
    }
    res.render("about", {
      title: "About",
      index: 5,
      total,
      listInfoProductInCart: allProductInCart,
      listProductInCart: listProductInCart,
      listCategories: allCategories,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
