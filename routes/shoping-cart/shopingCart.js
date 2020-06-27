var express = require("express");
const productServices = require("../../service/productServices");
const categoryServices = require("../../service/categoryServices");
const cartServices = require("../../service/cartServices");

var router = express.Router();

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
    res.render("shoping-cart", {
      title: "Shoping Cart",
      index: 3,
      listInfoProductInCart: allProductInCart,
      listProductInCart: listProductInCart,
      total,
      listCategories: allCategories,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/addToCart", async (req, res, next) => {
  try {
    const addToCart = await cartServices.insertProductToCart(req, res, "@cart");
    if (addToCart) res.redirect("/shoping-cart");
    res.redirect("/shoping-cart", 404);
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/updateCart", (req, res, next) => {
  try {
    const listProductInCart = cartServices.updateProductToCart(
      req,
      res,
      "@cart"
    );
    if (listProductInCart) res.redirect("/shoping-cart");
    res.redirect("/shoping-cart", 404);
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/deleteItemInCart", (req, res, next) => {
  const isDeleted = cartServices.deleteProductInCart(req, res, "@cart");
  if (isDeleted) res.redirect("/shoping-cart");
  return res.redirect("/shoping-cart", 404);
});

module.exports = router;
