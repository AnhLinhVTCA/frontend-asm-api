const express = require("express");
const adminServices = require("../../service/adminServices");
const router = express.Router();
const multer = require("multer");
const productModel = require("../../model/product");
router.get("/", async (req, res, next) => {
  const allProduct = await adminServices.getAllProducts();
  res.render("./admin/listProduct", {
    title: "Admin",
    listProducts: allProduct,
  });
});

router.get("/addProduct", (req, res, next) => {
  res.render("./admin/addProduct", { title: "Admin" });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), true);
  }
};

const upload = multer({ storage, fileFilter });
router.post("/addprd", upload.array("image", 12), async (req, res, next) => {
  const imagePath = [];
  const details = [];
  const {
    productName,
    price,
    category,
    color,
    size,
    quantity,
    description,
  } = req.body;
  for (const pathImg of req.files) {
    imagePath.push(pathImg.path);
  }
  const product = await productModel.find({ producName: productName });
  if (Array.isArray(color)) {
    for (let i = 0; i < color.length; i++) {
      details.push({
        color: color[i].toUpperCase(),
        size: size[i],
        quantity: quantity[i],
      });
    }
  } else {
    details.push({
      color: color.toUpperCase(),
      size: size,
      quantity: quantity,
    });
  }
  if (product.length === 0) {
    console.log(req.body);
    console.log(details);
    await productModel.create({
      productName,
      price,
      category,
      details,
      description,
      dateCreate: Date.now(),
      imagePath,
    });
  }
  res.redirect("/admin");
});

module.exports = router;
