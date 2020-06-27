const express = require("express");
const productServices = require("../service/productServices");
const categoryServices = require("../service/categoryServices");
const cartServices = require("../service/cartServices");

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  let total = 0;
  try {
    const allProductInCart = [];
    const allProduct = await productServices.getAllProducts();
    const allCategories = await categoryServices.getAllCategories();
    const listProductInCart = cartServices.getListProductInCart(req, "@cart");
    for (const productInCart of listProductInCart) {
      let product = await productServices.getProductById(productInCart.id);
      total += productInCart.quantity * product.price;
      allProductInCart.push(product);
    }
    res.render("index", {
      errors: req.flash("errors"),
      title: "Home",
      index: 1,
      total,
      listInfoProductInCart: allProductInCart,
      listProductInCart: listProductInCart,
      listProducts: allProduct,
      listCategories: allCategories,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get("/home-02", async (req, res, next) => {
  let total = 0;
  try {
    const allProductInCart = [];
    const allProduct = await productServices.getAllProducts();
    const allCategories = await categoryServices.getAllCategories();
    const listProductInCart = cartServices.getListProductInCart(req, "@cart");
    for (const productInCart of listProductInCart) {
      let product = await productServices.getProductById(productInCart.id);
      total += productInCart.quantity * product.price;
      allProductInCart.push(product);
    }
    res.render("home-02", {
      title: "Home 02",
      index: 1.2,
      listInfoProductInCart: allProductInCart,
      listProductInCart: listProductInCart,
      total,
      listProducts: allProduct,
      listCategories: allCategories,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get("/home-03", async (req, res, next) => {
  let total = 0;
  try {
    const allProductInCart = [];
    const allProduct = await productServices.getAllProducts();
    const allCategories = await categoryServices.getAllCategories();
    const listProductInCart = cartServices.getListProductInCart(req, "@cart");
    for (const productInCart of listProductInCart) {
      let product = await productServices.getProductById(productInCart.id);
      total += productInCart.quantity * product.price;
      allProductInCart.push(product);
    }
    res.render("home-03", {
      title: "Home 03",
      index: 1.3,
      total,
      listInfoProductInCart: allProductInCart,
      listProductInCart: listProductInCart,
      listProducts: allProduct,
      listCategories: allCategories,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = router;
