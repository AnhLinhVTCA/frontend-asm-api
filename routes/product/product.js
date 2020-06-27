const express = require("express");
const productServices = require("../../service/productServices");
const categoryServices = require("../../service/categoryServices");
const cartServices = require("../../service/cartServices");
const router = express.Router();

router.get("/", async (req, res, next) => {
  let total = 0;
  try {
    const allProductInCart = [];
    const allProducts = await productServices.getAllProducts();
    const allCategories = await categoryServices.getAllCategories();
    const listProductInCart = cartServices.getListProductInCart(req, "@cart");
    for (const productInCart of listProductInCart) {
      let product = await productServices.getProductById(productInCart.id);
      total += productInCart.quantity * product.price;
      allProductInCart.push(product);
    }
    res.render("product", {
      title: "Product",
      index: 2,
      total,
      listInfoProductInCart: allProductInCart,
      listProductInCart: listProductInCart,
      listProducts: allProducts,
      listCategories: allCategories,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/product-detail?:id", async (req, res, next) => {
  let total = 0;
  try {
    const allProductInCart = [];
    const product = await productServices.getProductById(req.query.id);
    const allCategories = await categoryServices.getAllCategories();
    const listProductInCart = cartServices.getListProductInCart(req, "@cart");
    for (const productInCart of listProductInCart) {
      let product = await productServices.getProductById(productInCart.id);
      total += productInCart.quantity * product.price;
      allProductInCart.push(product);
    }
    res.render("product-detail", {
      title: "Product Detail",
      product,
      total,
      listInfoProductInCart: allProductInCart,
      listProductInCart: listProductInCart,
      listCategories: allCategories,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.post("/product-detail-quick", async (req, res, next) => {
  try {
    const product = await productServices.getProductById(req.body.id);
    res.json({ product });
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/search?:q", async (req, res, next) => {
  let total = 0;
  try {
    const allProductInCart = [];
    const product = await productServices.getProductByName(req.query.q);
    const allCategories = await categoryServices.getAllCategories();
    const listProductInCart = cartServices.getListProductInCart(req, "@cart");
    for (const productInCart of listProductInCart) {
      let product = await productServices.getProductById(productInCart.id);
      total += productInCart.quantity * product.price;
      allProductInCart.push(product);
    }
    res.render("product", {
      title: "Product",
      index: 2,
      total,
      listInfoProductInCart: allProductInCart,
      listProductInCart: listProductInCart,
      listProducts: product,
      listCategories: allCategories,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/search", async (req, res, next) => {
  try {
    const product = await productServices.getProductByName(req.body.q);
    res.json({ product });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
