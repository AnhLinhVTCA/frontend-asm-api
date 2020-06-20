var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.render("shoping-cart", { title: "Shoping Cart" });
});

module.exports = router;
