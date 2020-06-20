const express = require("express");
const cus = require("../../model/customer");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  const customer = await cus.findOne({ email });
  if (customer && customer.password === password) {
    res.redirect("/admin");
  }
  res.status(400).send("Invalid email or password!");
});

module.exports = router;
