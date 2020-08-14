const productModel = require("../model/product");

const getAllProducts = async () => {
  return await productModel.find({ deleted_at: null });
};

const getProductById = async (_id) => {
  return await productModel.findOne({ _id });
};

const getProductByName = async (name) => {
  const product = await productModel.find({
    productName: { $regex: name, $options: "i" },
  });
  return product;
};


module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
};
