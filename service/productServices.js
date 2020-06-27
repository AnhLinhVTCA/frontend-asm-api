const multer = require("multer");
const productModel = require("../model/product");
const cartServices = require("./cartServices");
// ================================================================== multer
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

const upload = multer({
  storage,
  fileFilter,
});

// =================================================================== service

const getAllProducts = async () => {
  const allProducts = await productModel.find();
  return allProducts;
};

const getProductById = async (_id) => {
  const product = await productModel.findOne({ _id });
  return product;
};

const getProductByName = async (name) => {
  const product = await productModel.find({
    productName: { $regex: name, $options: "i" },
  });
  return product;
};

const insertProduct = async (req) => {
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
  const product = await productModel.findOne({
    productName,
  });
  if (!product) {
    for (const pathImg of req.files) {
      if (pathImg !== "") imagePath.push(pathImg.path);
    }

    if (Array.isArray(color)) {
      for (let i = 0; i < color.length; i++) {
        if (color !== "" && quantity !== "") {
          details.push({
            color: color[i].toUpperCase(),
            size: size[i],
            quantity: quantity[i],
          });
        }
      }
    } else {
      if (color !== "" && quantity !== "") {
        details.push({
          color: color.toUpperCase(),
          size: size,
          quantity: quantity,
        });
      }
    }
    if (details.length > 0 && imagePath.length > 0) {
      await productModel.create({
        productName,
        price,
        category,
        details,
        description,
        dateCreate: Date.now(),
        imagePath,
      });

      return true;
    }
  }
  return false;
};
const updateProduct = async (req, res) => {
  const details = [];
  const {
    id,
    productName,
    price,
    category,
    color,
    size,
    quantity,
    description,
    indexImageDeleted,
  } = req.body;
  const product = await productModel.findById({
    _id: id,
  });
  if (product) {
    const imagePath = product.imagePath;
    if (indexImageDeleted) {
      if (Array.isArray(indexImageDeleted)) {
        indexImageDeleted.forEach((value) => {
          imagePath.splice(value, 1);
        });
      } else {
        imagePath.splice(indexImageDeleted, 1);
      }
    }
    for (const pathImg of req.files) {
      if (pathImg !== "") imagePath.push(pathImg.path);
    }
    if (Array.isArray(color)) {
      for (let i = 0; i < color.length; i++) {
        if (color !== "" && quantity !== "") {
          details.push({
            color: color[i].toUpperCase(),
            size: size[i],
            quantity: quantity[i],
          });
        }
      }
    } else {
      if (color !== "" && quantity !== "") {
        details.push({
          color: color.toUpperCase(),
          size: size,
          quantity: quantity,
        });
      }
    }
    if (details.length > 0 && imagePath.length > 0) {
      await productModel.updateOne(
        { _id: id },
        {
          productName,
          price,
          category,
          details,
          description,
          dateCreate: Date.now(),
          imagePath,
        }
      );
      return true;
    }
  }
  return false;
};

const deleteProduct = async (req, res, name) => {
  const { id } = req.query;
  if (id && id !== undefined) {
    await productModel.deleteOne({ _id: id });
    const isDeleteProductInCart = cartServices.deleteProductInCart(
      req,
      res,
      name
    );
    if (isDeleteProductInCart) return true;
  }
  return false;
};

module.exports = {
  getAllProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductByName,
  upload,
};
