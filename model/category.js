const mongoose = require("mongoose");

module.exports = mongoose.model(
  "category",
  {
    categoryName: { type: String, index: true, unique: true },
  },
  "category"
);
