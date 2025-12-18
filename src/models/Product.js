
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Product", productSchema);
