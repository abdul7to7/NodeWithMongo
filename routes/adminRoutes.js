const {
  postProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/adminController");

const router = require("express").Router();

router.get("/all-products", getAllProducts);
router.post("/add-product", postProduct);
router.delete("/delete-product/:_id", deleteProduct);

module.exports = router;
