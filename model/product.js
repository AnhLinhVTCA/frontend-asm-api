const mongoose = require("mongoose");

module.exports = mongoose.model(
  "product",
  {
    productName: { type: String, index: true, unique: true },
    price: Number,
    category: String,
    details: [
      {
        color: String,
        size: { type: String, enum: ["S", "M", "L", "XL", "XXL"] },
        quantity: Number,
      },
    ],
    description: String,
    dateCreate: Date,
    imagePath: [String],
    deleted_at: String,
  },
  "product"
);
