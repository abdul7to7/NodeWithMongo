const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User", // Reference to the User model
  },
  items: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Product", // Reference to the Product model
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
