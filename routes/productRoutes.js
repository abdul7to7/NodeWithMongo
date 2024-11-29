const { getProducts } = require("../controllers/productController");

const router = require("express").Router();

router.get("/get-products", getProducts);

module.exports = router;
