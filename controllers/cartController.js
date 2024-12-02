const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findByUserId(req.user._id);
    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [],
      });

      // Save the new cart
      await cart.save();
    }

    // Populate product details

    cart.items = await Promise.all(
      cart.items.map(async (item) => {
        // const product = await db.collection("products").findOne({
        //   _id: item.productId,
        // });
        const product = await Product.findById(item.productId);

        return { ...item, product };
      })
    );

    return res.status(200).json({ success: true, cart: cart });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: `Something went wrong:${e.message}` });
  }
};
exports.addProductToCart = async (req, res, next) => {
  try {
    let cart = await Cart.findByUserId(req.user._id);
    if (!cart) {
      cart = new Cart({ userId: req.user._id });
      await cart.save();
    }

    await cart.addItem(req.params.productId);
    return res.json({ success: true });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: `Something went wrong:${e.message}` });
  }
};
exports.getRemoveProductToCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByUserId(req.user._id);
    if (!cart) {
      return res
        .status(500)
        .json({ success: false, message: "something went wrong" });
    }
    await cart.removeItem(req.params.productId);
    return res.json({ success: true });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: `Something went wrong:${e.message}` });
  }
};

exports.getDeleteProductFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByUserId(req.user._id);
    if (!cart) {
      return res
        .status(500)
        .json({ success: false, message: "something went wrong" });
    }
    await cart.deleteItem(req.params.productId);
    return res.json({ success: true });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: `something went wrong:${e}` });
  }
};
