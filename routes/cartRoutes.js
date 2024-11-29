const {
  getCart,
  addProductToCart,
  removeProductToCart,
} = require("../controllers/cartController");

const router = require("express").Router();

router.get("/get-cart/:cartId", getCart);
router.get("/add-to-cart/:productId", addProductToCart);
router.get("/remove-to-cart/:productId", removeProductToCart);

module.exports = router;
