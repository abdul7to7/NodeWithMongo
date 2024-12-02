const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

// Static methods for the Product model
productSchema.statics.findAll = async function () {
  return this.find();
};

productSchema.statics.findById = async function (id) {
  return this.findOne({ _id: id });
};

productSchema.statics.deleteById = async function (id) {
  const result = await this.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw new Error(`No product found with ID: ${id}`);
  }
  return { success: true, message: "Product deleted successfully" };
};

// Instance methods for the Product model
productSchema.methods.saveProduct = async function () {
  return this.save();
};

// Create the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
