const customerModel = require("../model/customer");
const productModel = require("../model/product");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("../helper/bcrypt");
const { ADMIN } = require("../constants");

const adminLogin = async (email, password) => {
  const customer = await customerModel.findOne({ email });
  if (!customer) {
    throw new Error("Email not found");
  }
  const validatePassword = bcrypt.compare(password, customer.password);
  if (!validatePassword) {
    throw new Error("Invalid email or password!")
  }
  const token = jwt.sign({ data: admin }, process.env.JWT_SECRET, { expiresIn: '7d' });
  const refreshToken = jwt.sign({ data: admin }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '14d' });
  return {
    token,
    refreshToken
  }
}

const adminRegister = async (admin) => {
  const customer = await customerModel.findOne({ email: admin.email });
  if (!customer) {
    throw new Error("Email not found");
  }
  if (admin.password !== admin.rePassword) {
    throw new Error("Password not invalid");
  }
  const hasPassword = bcrypt.hash(admin.password);
  return await customerModel.create({
    cusName: admin.name,
    email: admin.email,
    password: hasPassword,
    role: ADMIN
  });
}

const adminListProducts = async () => {
  return await productModel.find();
}

const adminUpdateProduct = async (product) => {
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
  } = product;
  const isExistsProduct = await productModel.findById({
    _id: id,
  });
  if (!isExistsProduct) {
    throw new Error("Product not exists!");
  }
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
    return await isExistsProduct.updateOne(
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
  }
  throw new Error("Error when update product!");
};

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

// =================================================================== service ============================

const adminInsertProduct = async (product) => {
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
  } = product;
  const isExsistsProduct = await productModel.findOne({
    productName,
  });
  if (isExsistsProduct) {
    throw new Error("Product exists!");

  };
  for (const pathImg of req.files) {
    if (pathImg !== "") imagePath.push(pathImg.path.replace("public", ""));
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
    return await productModel.create({
      productName,
      price,
      category,
      details,
      description,
      dateCreate: Date.now(),
      imagePath,
    });
  }
  throw new Error("Error when insert product!");
}

const adminDeleteProduct = async (id) => {
  const product = productModel.findById(id);
  if (product) {
    throw new Error("Product not exists!");
  }
  return await product.updateOne({ deleted_at: Date.now() });
};

module.exports = {
  adminLogin,
  adminRegister,
  adminListProducts,
  adminUpdateProduct,
  adminInsertProduct,
  adminDeleteProduct,
  upload
}