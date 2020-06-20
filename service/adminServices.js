const mongoose = require("mongoose");
const product = require("../model/product");
const getAllProducts = async () => {
  const allProducts = await product.find();
  return allProducts;
};

module.exports = {
  getAllProducts,
};
