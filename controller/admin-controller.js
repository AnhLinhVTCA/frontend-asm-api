const HttpStatus = require("http-status-codes");
const adminServices = require("../services/adminServices");
const categoryServices = require("../services/categoryServices");

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await adminServices.adminLogin(email, password);
    res.status(200).json(admin);
  } catch (error) {
    next({
      status: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
}

const adminRegister = async (req, res, next) => {
  try {
    const { admin } = req.body;
    const isRegisterAdmin = await adminServices.adminRegister(admin);
    res.status(200).json(isRegisterAdmin);
  } catch (error) {
    next({
      status: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
}

const adminListProducts = async (req, res, next) => {
  try {
    const listProduct = await adminServices.adminListProducts();
    res.status(200).json(listProduct);
  } catch (error) {
    next({
      status: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
}

const adminUpdateProduct = async (req, res, next) => {
  try {
    const { product } = req.body
    const isUpdateProduct = await adminServices.adminUpdateProduct(product);
    res.status(200).json(isUpdateProduct);
  } catch (error) {
    next({
      status: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
}

const adminInsertProduct = async (req, res, next) => {
  try {
    const { product } = req.body;
    const isInsertProduct = productServices.adminInsertProduct(product);
    res.status(200).json(isInsertProduct)
  } catch (error) {
    next({
      status: HttpStatus.BAD_REQUEST,
      message: error.message
    })
  }
}

const adminDeleteProduct = async (req, res, next) => {
  try {
    const { id } = req.query;
    const isDeleteProduct = productServices.adminDeleteProduct(id);
    res.status(200).json(isDeleteProduct)
  } catch (error) {
    next({
      status: HttpStatus.BAD_REQUEST,
      message: error.message
    })
  }
}

const adminInsertCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    const isInsertProduct = categoryServices.insertCategory(categoryName);
    res.status(200).json(isInsertProduct)
  } catch (error) {
    next({
      status: HttpStatus.BAD_REQUEST,
      message: error.message
    })
  }
}

module.exports = {
  adminInsertProduct,
  adminLogin,
  adminRegister,
  adminListProducts,
  adminUpdateProduct,
  adminDeleteProduct,
  adminInsertCategory,
  upload: adminServices.upload
}