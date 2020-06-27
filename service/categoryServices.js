const categoryModel = require("../model/category");

const getAllCategories = async () => {
  const allCategorys = await categoryModel.find();
  return allCategorys;
};

const insertCategory = async (categoryName) => {
  const category = await categoryModel.findOne({ categoryName });
  if (!category && categoryName !== "") {
    await categoryModel.create({
      categoryName,
    });
  }
};

module.exports = {
  getAllCategories,
  insertCategory,
};
