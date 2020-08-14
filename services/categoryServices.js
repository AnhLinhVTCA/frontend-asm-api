const categoryModel = require("../model/category");

const getListAllCategories = async () => {
  return await categoryModel.find();
};

const insertCategory = async (categoryName) => {
  const category = await categoryModel.findOne({ categoryName });
  if (category) {
    throw new Error("Category exists!");
  }
  return await categoryModel.create({
    categoryName,
  });
};

module.exports = {
  getListAllCategories,
  insertCategory,
};
