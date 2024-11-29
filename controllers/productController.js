const Product = require("../models/Product"); // Product model
const Cart = require("../models/Cart"); // Cart model

exports.getProducts = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming userId is extracted from authentication middleware

    // Fetch all products
    const products = await Product.findAll(); //  returns plain JS objects

    // Fetch the cart for the current user
    const cart = await Cart.findByUserId(userId);

    // Extract product IDs in the user's cart
    const cartProductIds = new Set(
      cart?.items.map((item) => item.productId.toString()) || []
    );

    // Add the `inCart` property to each product
    const productsWithCartInfo = products.map((product) => ({
      ...product,
      inCart: cartProductIds.has(product._id.toString()), // Check if product ID is in the cart
    }));

    return res
      .status(200)
      .json({ success: true, products: productsWithCartInfo });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ success: false, message: "Something Went Wrong" });
  }
};
