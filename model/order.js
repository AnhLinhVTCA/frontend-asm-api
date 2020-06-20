const mongoose = require("mongoose");

module.exports = mongoose.model(
  "order",
  {
    orderId: { type: String, index: true, unique: true },
    cusId: String,
    productId: String,
    orderDate: Date,
    addressShip: String,
    status: {
      type: String,
      enum: ["Đang xử lý", "Đang giao", "Giao hàng thành công"],
    },
  },
  "order"
);
