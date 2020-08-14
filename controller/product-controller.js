const HttpStatus = require("http-status-codes");
const productServices = require("../services/productServices");

const productDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productServices.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    next({
      status: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
}

const search = async (req, res, next) => {
  try {
    const { q } = req.query;
    const listProducts = await productServices.getProductByName(q);
    res.status(200).json(listProducts);
  } catch (error) {
    next({
      status: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
}

const listProducts = async (req, res) => {
  try {
    const listProducts = await productServices.getAllProducts();
    res.status(200).json(listProducts);
  } catch (error) {
    next({
      status: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
}

module.exports = {
  listProducts,
  productDetail,
  search,
}