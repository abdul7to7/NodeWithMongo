const {
  postProduct,
  deleteProduct,
} = require("../controllers/adminController");

const router = require("express").Router();

router.post("/add-product", postProduct);
router.delete("/delete-product/:_id", deleteProduct);

module.exports = router;
