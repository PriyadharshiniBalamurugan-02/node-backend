
const Product = require("../models/Product");

exports.create = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

exports.list = async (req, res) => {
  const { page = 1, limit = 5, sort = "price", category } = req.query;
  const filter = category ? { category } : {};
  const products = await Product.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(products);
};

exports.getById = async (req, res) => {
  res.json(await Product.findById(req.params.id));
};

exports.update = async (req, res) => {
  res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
