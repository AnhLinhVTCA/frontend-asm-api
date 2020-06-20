const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("product", { title: "Product" });
});

module.exports = router;
