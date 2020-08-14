const mongoose = require("mongoose");

module.exports = mongoose.model(
  "customer",
  {
    cusName: String,
    birthDate: Date,
    address: [String],
    phoneNumber: String,
    email: { type: String, index: true, unique: true, require: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["ADMIN", "USER"] },
    gender: { type: String, enum: ["male", "female"] },
  },
  "customer"
);
