const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.get("/", protect, getCategories);
router.get("/:id", protect, getCategoryById);
router.post("/", protect, authorize("admin", "manager"), createCategory);
router.put("/:id", protect, authorize("admin", "manager"), updateCategory);
router.delete("/:id", protect, authorize("admin"), deleteCategory);

module.exports = router;