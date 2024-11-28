const mongodb = require("mongodb");
const { getDB } = require("../utils/db");

class Product {
  static collectionName = "products";

  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.createdAt = data.createdAt || new Date();
    this.userId = data.userId ? data.userId : null;
  }

  static async getCollection() {
    const db = await getDB();
    return db.collection(Product.collectionName);
  }

  async save() {
    const db = await getDB();

    if (this._id) {
      // Update existing product
      const objectId = new mongodb.ObjectId(this._id);
      await db
        .collection(Product.collectionName)
        .updateOne({ _id: objectId }, { $set: this });
    } else {
      // Insert new product
      const result = await db
        .collection(Product.collectionName)
        .insertOne(this);
      this._id = result.insertedId;
    }
    return this;
  }

  static async findAll() {
    const db = await getDB();

    const products = await db
      .collection(Product.collectionName)
      .find()
      .toArray();
    return products.map((product) => new Product(product));
  }

  static async findById(id) {
    const db = await getDB();
    const objectId = new mongodb.ObjectId(id);
    const product = await db
      .collection(Product.collectionName)
      .findOne({ _id: objectId });
    return product ? new Product(product) : null;
  }

  static async deleteById(productId) {
    try {
      const db = await getDB();
      const objectId = new mongodb.ObjectId(productId); // Convert to ObjectId
      const result = await db
        .collection(Product.collectionName)
        .deleteOne({ _id: objectId });

      if (result.deletedCount === 0) {
        throw new Error(`No product found with ID: ${productId}`);
      }

      return { success: true, message: "Product deleted successfully" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
}

module.exports = Product;
