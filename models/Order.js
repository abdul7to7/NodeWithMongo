const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    status: { type: String, default: "pending" }, // Order status
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

// Static method to create an order from cart items
orderSchema.statics.createOrderFromCart = async function (cart) {
  const totalAmount = cart.items.reduce((total, item) => {
    // Assuming that `Product` has a `price` field, calculate total for each item
    return total + item.quantity * item.productId.price;
  }, 0);

  const order = new this({
    userId: cart.userId,
    items: cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
    totalAmount: totalAmount,
  });

  return await order.save();
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
