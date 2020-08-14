const { adminInsertProduct, adminLogin, adminRegister, adminListProducts, adminUpdateProduct, adminInsertCategory, adminDeleteProduct, upload } = require("../controller/admin-controller");

const { } = require("../middleware/admin-middleware");

const adminRouter = router => {
  router.post("/admin/login", adminLogin);
  router.post("/admin/register", adminRegister);
  router.post("/admin/insert-product", upload.array("image", 12), adminInsertProduct);
  router.post("/admin/insert-category", adminInsertCategory);
  router.delete("/admin/delete-product?id", adminDeleteProduct)
  router.get("/admin/products", adminListProducts);
  router.put("/admin/update-product", adminUpdateProduct);
}

module.exports = adminRouter;