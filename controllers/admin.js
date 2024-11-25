const Product = require("../models/Product"); // Assuming Product is a Mongoose model

// Add Product to Database (POST /admin/add-product)
exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;

  const product = new Product({
    title,
    imageUrl,
    price,
    description,
  });

  product
    .save()
    .then(() => {
      res.status(201).json({ message: "Product added successfully!" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to add product." });
    });
};

// Edit and Update Product (PUT /admin/edit-product/:productId)
exports.postEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const { title, price, imageUrl, description } = req.body;

  Product.findByIdAndUpdate(
    prodId,
    {
      title,
      price,
      imageUrl,
      description,
    },
    { new: true } // Returns the updated product
  )
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found!" });
      }
      res
        .status(200)
        .json({ message: "Product updated successfully!", updatedProduct });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to update product." });
    });
};

// Get All Products (GET /admin/products)
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json({ products });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch products." });
    });
};

// Delete Product (DELETE /admin/delete-product/:productId)
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByIdAndDelete(prodId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Product not found!" });
      }
      res.status(200).json({ message: "Product deleted successfully!" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to delete product." });
    });
};
