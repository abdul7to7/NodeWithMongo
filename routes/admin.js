const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => POST (Endpoint to add a product)
router.get("/add-product", adminController.postAddProduct);

// /admin/products => GET (Endpoint to fetch all products)
router.get("/products", adminController.getProducts);

// /admin/add-product => POST (Endpoint to add a new product to the DB)
router.post("/add-product", adminController.postAddProduct);

// /admin/edit-product/:productId => POST (Endpoint to fetch and edit a product)
router.get("/edit-product/:productId", adminController.postEditProduct);

// /admin/edit-product => POST (Endpoint to update an existing product)
router.post("/edit-product", adminController.postEditProduct);

// /admin/delete-product => POST (Endpoint to delete a product)
router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
