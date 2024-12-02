const mongoose = require("mongoose");

// Define the Cart schema
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the User
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Static methods for the Cart model
cartSchema.statics.findByUserId = async function (userId) {
  return this.findOne({ userId });
};

cartSchema.statics.findAll = async function () {
  return this.find();
};

cartSchema.statics.getCartById = async function (cartId) {
  return this.findById(cartId);
};

// Instance methods for the Cart model
cartSchema.methods.addItem = async function (productId, quantity = 1) {
  const existingItem = this.items.find((item) =>
    item.productId.equals(productId)
  );

  if (existingItem) {
    // Update the quantity
    existingItem.quantity += quantity;
  } else {
    // Add new item to the cart
    this.items.push({ productId, quantity });
  }

  // Save the updated cart
  return this.save();
};

cartSchema.methods.removeItem = async function (productId, quantity = 1) {
  const itemIndex = this.items.findIndex((item) =>
    item.productId.equals(productId)
  );

  if (itemIndex !== -1) {
    // Decrease the quantity
    this.items[itemIndex].quantity -= quantity;

    // Remove the item if quantity is 0 or less
    if (this.items[itemIndex].quantity <= 0) {
      this.items.splice(itemIndex, 1);
    }

    // Save the updated cart
    return this.save();
  }
};

cartSchema.methods.deleteItem = async function (productId) {
  this.items = this.items.filter((item) => !item.productId.equals(productId));
  return this.save();
};

// Create the Cart model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
