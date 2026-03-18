const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  softDeleteProduct
} = require("../controllers/productController");


const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");



router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById);
router.post("/", protect, authorize("admin", "manager"), createProduct);
router.put("/:id", protect, authorize("admin", "manager"), updateProduct);
router.delete("/:id", protect, authorize("admin"), softDeleteProduct);


module.exports = router;