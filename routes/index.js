const { Router } = require("express");
const router = new Router();
const adminRouter = require("./admin");
const productRouter = require("./product");
const categoryRouter = require("./category");

adminRouter(router);
productRouter(router);
categoryRouter(router);

module.exports = router;
