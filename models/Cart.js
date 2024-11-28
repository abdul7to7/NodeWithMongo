const mongodb = require("mongodb");
const { getDB } = require("../utils/db"); // Assumes getDB is implemented in this file

class Cart {
  static collectionName = "carts";

  constructor(data) {
    this.userId = req.user._id; // Reference to the user
    this.items = data.items || []; // Array of { productId, quantity }
    this.createdAt = data.createdAt || new Date();
  }

  static async getCollection() {
    const db = await getDB(); // Connect to the database
    return db.collection(Cart.collectionName);
  }

  async save() {
    const db = await getDB();
    if (this._id) {
      // Update existing cart
      const objectId = new mongodb.ObjectId(this._id);
      await db
        .collection(Cart.collectionName)
        .updateOne({ _id: objectId }, { $set: this });
    } else {
      // Insert new cart
      const result = await collection.insertOne(this);
      this._id = result.insertedId;
    }
    return this;
  }

  async addItem(productId, quantity = 1) {
    const productObjectId = new mongodb.ObjectId(productId);

    // Check if the product already exists in the cart
    const existingItem = this.items.find((item) =>
      item.productId.equals(productObjectId)
    );

    if (existingItem) {
      // Update the quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item to the cart
      this.items.push({ productId: productObjectId, quantity });
    }

    // Save the updated cart
    await this.save();
  }

  async removeItem(productId, quantity = 1) {
    const productObjectId = new mongodb.ObjectId(productId);

    // Find the product in the cart
    const itemIndex = this.items.findIndex((item) =>
      item.productId.equals(productObjectId)
    );

    if (itemIndex !== -1) {
      // Decrease the quantity
      this.items[itemIndex].quantity -= quantity;

      // Remove the item if quantity is 0 or less
      if (this.items[itemIndex].quantity <= 0) {
        this.items.splice(itemIndex, 1);
      }

      // Save the updated cart
      await this.save();
    }
  }

  async getItems() {
    const db = await getDB();
    const items = await db.collection(Cart.collectionName).findAll();
    return items;
  }

  static async findByUserId(userId) {
    const db = await getDB();

    const objectId = new mongodb.ObjectId(userId);
    const cart = await db
      .collection(Cart.collectionName)
      .findOne({ userId: objectId });

    if (!cart) return null;

    // Populate product details
    cart.items = await Promise.all(
      cart.items.map(async (item) => {
        const product = await db.collection("products").findOne({
          _id: item.productId,
        });
        return { ...item, product };
      })
    );

    return new Cart(cart);
  }

  static async findAll() {
    const db = await getDB();
    const carts = await db.collection(Cart.collectionName).find().toArray();
    return carts.map((cart) => new Cart(cart));
  }
}

module.exports = Cart;
