const mongoose = require("mongoose");

module.exports = mongoose.model(
  "customer",
  {
    cusName: String,
    birthDate: Date,
    address: [String],
    phoneNumber: String,
    email: { type: String, index: true, unique: true },
    password: String,
    gender: { type: String, enum: ["male", "female"] },
  },
  "customer"
);
