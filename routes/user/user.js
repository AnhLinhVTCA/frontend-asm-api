const express = require("express");
const cus = require("../../model/customer");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  const customer = await cus.findOne({ email });
  if (customer && customer.password === password) {
    res.redirect("/admin");
  }
  req.flash("errors", "Invalid email or password!");
  res.redirect("/");
  next();
});

module.exports = router;
