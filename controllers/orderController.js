exports.createOrder = async (req, res, next) => {
  try {
    // Get the user's cart by their userId
    const cart = await Cart.findByUserId(req.user._id);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Your cart is empty!" });
    }

    // Create an order from the cart
    const order = await Order.createOrderFromCart(cart);

    // Optionally, you can clear the cart after creating the order
    cart.items = [];
    await cart.save();

    res.json({
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while placing the order." });
  }
};
