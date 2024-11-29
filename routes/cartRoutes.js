const {
  getCart,
  addProductToCart,
  getDeleteProductFromCart,
  getRemoveProductToCart,
} = require("../controllers/cartController");

const router = require("express").Router();

router.get("/get-cart", getCart);
router.get("/add-to-cart/:productId", addProductToCart);
router.get("/remove-product-to-cart/:productId", getRemoveProductToCart);
router.get("/delete-product-from-cart/:productId", getDeleteProductFromCart);

module.exports = router;
