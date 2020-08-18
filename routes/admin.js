const { adminInsertProduct, adminLogin, adminRegister, adminListProducts, adminUpdateProduct, adminInsertCategory, adminListProductsDeleted, adminDeleteProduct, upload } = require("../controller/admin-controller");

const { } = require("../middleware/admin-middleware");

const adminRouter = router => {
  router.post("/admin/login", adminLogin);
  router.post("/admin/register", adminRegister);
  router.post("/admin/insert-product", upload.array("image", 12), adminInsertProduct);
  router.post("/admin/insert-category", adminInsertCategory);
  router.get("/admin/products", adminListProducts);
  router.get("/admin/products-deleted", adminListProductsDeleted);
  router.put("/admin/update-product", upload.array("image", 12), adminUpdateProduct);
  router.delete("/admin/delete-product", adminDeleteProduct)
}

module.exports = adminRouter;