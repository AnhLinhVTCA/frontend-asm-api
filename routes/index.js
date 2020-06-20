var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Home" });
});

router.get("/home-02", (req, res, next) => {
  res.render("home-02", { title: "Home 02" });
});

router.get("/home-03", (req, res, next) => {
  res.render("home-03", { title: "Home 03" });
});

module.exports = router;
