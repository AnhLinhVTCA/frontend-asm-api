const { listProducts, productDetail, search } = require("../controller/product-controller");

const { } = require("../middleware/product-middleware");


const productRouter = router => {
  router.get("/list-products", listProducts)
  router.get("/product-detail/:id", productDetail)
  router.get("/search?:q", search)
}

module.exports = productRouter;