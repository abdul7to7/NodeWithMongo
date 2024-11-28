const {
  getCart,
  addProductToCart,
  removeProductToCart,
} = require("../controllers/cartController");

const router = require("express").Router();

router.get("/get-cart", getCart);
router.post("/add-to-cart", addProductToCart);
router.delete("/remove-to-cart/:_id", removeProductToCart);

module.exports = router;
