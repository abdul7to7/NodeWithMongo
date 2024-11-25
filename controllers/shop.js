const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json({
        message: "Fetched all products successfully",
        products: products,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch products" });
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json({
        message: "Fetched all products successfully",
        products: products,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch products" });
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({
        message: "Product fetched successfully",
        product: product,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch product details" });
    });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.find({ _id: { $in: cart.products.map((p) => p.productId) } })
      .then((products) => {
        const cartProducts = [];
        for (const product of products) {
          const cartProductData = cart.products.find(
            (prod) => prod.productId.toString() === product._id.toString()
          );
          if (cartProductData) {
            cartProducts.push({
              productData: product,
              qty: cartProductData.qty,
            });
          }
        }
        res.status(200).json({
          message: "Cart fetched successfully",
          cartProducts: cartProducts,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch cart products" });
      });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      Cart.addProduct(prodId, product.price);
      res.status(200).json({
        message: "Product added to cart successfully",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to add product to cart" });
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      Cart.deleteProduct(prodId, product.price);
      res.status(200).json({
        message: "Product removed from cart successfully",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to remove product from cart" });
    });
};

exports.getOrders = (req, res, next) => {
  // You can replace this with a database query to fetch orders.
  res.status(200).json({
    message: "Fetching orders is not implemented yet",
  });
};

exports.getCheckout = (req, res, next) => {
  // You can replace this with a database query to fetch checkout data.
  res.status(200).json({
    message: "Checkout is not implemented yet",
  });
};
