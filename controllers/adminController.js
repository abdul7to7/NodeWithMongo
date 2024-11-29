const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.postProduct = async (req, res, next) => {
  try {
    console.log(req.user);
    const product = new Product({ ...req.body, userId: req.user._id });
    const savedProduct = await product.save();
    return res.status(201).json({ success: true, product: savedProduct });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `something went wrong : ${err.message}`,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const _id = req.params._id;
    await Product.deleteById(_id);
    return res
      .status(200)
      .json({ success: true, message: "deleted successfully" });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `something went wrong : ${err.message}`,
    });
  }
};

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.findAll();
  console.log(products);
  return res.json({ success: true, products });
};
