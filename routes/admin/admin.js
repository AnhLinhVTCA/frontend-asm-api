const express = require("express");
const productServices = require("../../service/productServices");
const categoryServices = require("../../service/categoryServices");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allProduct = await productServices.getAllProducts();
    res.render("./admin/listProducts", {
      title: "Admin",
      index: 1,
      listProducts: allProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/insertProduct", async (req, res, next) => {
  try {
    const allCategories = await categoryServices.getAllCategories();
    res.render("./admin/insertProduct", {
      title: "Admin",
      index: 2,
      listCategories: allCategories,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.post(
  "/insertProduct",
  productServices.upload.array("image", 12),
  async (req, res, next) => {
    try {
      await productServices.insertProduct(req);
      res.redirect("/admin");
    } catch (error) {
      throw new Error(error);
    }
  }
);

router.get("/showListCategories", async (req, res, next) => {
  try {
    const allCategories = await categoryServices.getAllCategories();
    res.render("./admin/listCategories", {
      title: "Admin",
      index: 3,
      listCategories: allCategories,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/insertCategory", async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    const isInsert = await categoryServices.insertCategory(categoryName);
    if (isInsert) res.redirect("/admin/showListCategories");
    res.redirect("/admin/showListCategories", 404);
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/updateProduct?:id", async (req, res, next) => {
  const { id } = req.query;
  try {
    if (id && id !== undefined) {
      const product = await productServices.getProductById(id);
      const category = await categoryServices.getAllCategories();
      if (product) res.render("./admin/updateProduct", { product, category });
    }
    res.redirect("/admin/listProducts", 404);
  } catch (error) {
    throw new Error(error);
  }
});

router.post(
  "/updateProduct",
  productServices.upload.array("image", 12),
  (req, res, next) => {
    try {
      const isUpdate = productServices.updateProduct(req, res, "@cart");
      if (isUpdate) res.redirect("/admin");
      res.redirect("/admin", 404);
    } catch (error) {
      throw new Error(error);
    }
  }
);

router.get("/deleteProduct?:id", async (req, res, next) => {
  try {
    const isDelete = await productServices.deleteProduct(req, res);
    if (isDelete) res.redirect("/admin");
    res.redirect("/admin", 404);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
