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
  // const token = jwt.sign({ data: admin }, process.env.JWT_SECRET, { expiresIn: '7d' });
  // const refreshToken = jwt.sign({ data: admin }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '14d' });
  // return {
  //   token,
  //   refreshToken
  // }
  return customer;
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
  return await productModel.find({ deleted_at: "" });
}

const adminListProductsDeleted = async () => {
  return await productModel.find({ deleted_at: { $ne: "" } });
}

const adminUpdateProduct = async (product) => {
  const {
    _id,
    productName,
    price,
    category,
    details,
    description,
    imagePath,
    indexImageDeleted,
  } = product;
  const isExistsProduct = await productModel.findById({
    _id,
  });
  if (!isExistsProduct) {
    throw new Error("Product not exists!");
  }
  console.log(product)
  if (indexImageDeleted.length > 0) {
    if (Array.isArray(indexImageDeleted)) {
      indexImageDeleted.forEach((value) => {
        imagePath.splice(value, 1);
      });
    } else {
      imagePath.splice(indexImageDeleted, 1);
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
  const listIMG = [];
  const {
    productName,
    price,
    category,
    details,
    description,
    imagePath
  } = product;
  const isExsistsProduct = await productModel.findOne({
    productName,
  });
  if (isExsistsProduct) {
    throw new Error("Product exists!");
  };
  for (let pathImg of imagePath) {
    listIMG.push(pathImg.replace("", "images/"));
  }
  if (details.length > 0 && imagePath.length > 0) {
    return await productModel.create({
      productName,
      price,
      category,
      details,
      description,
      dateCreate: Date.now(),
      imagePath: listIMG,
      deleted_at: ''
    });
  }
  throw new Error("Error when insert product!");
}

const adminDeleteProduct = async (_id) => {
  const product = await productModel.findById(_id);
  if (!product) {
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
  adminListProductsDeleted,
  upload
}