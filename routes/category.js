const { getListCategories } = require("../controller/category-controller");

const { } = require("../middleware/category-middleware");


const categoryRouter = router => {
  router.get("/list-categories", getListCategories)
}

module.exports = categoryRouter;