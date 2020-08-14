const HttpStatus = require("http-status-codes");
const categoryServices = require("../services/categoryServices");

const getListCategories = async (req, res, next) => {
  try {
    const listCategories = await categoryServices.getListAllCategories();
    res.status(200).json(listCategories);
  } catch (error) {
    next({
      status: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
}

module.exports = {
  getListCategories
}