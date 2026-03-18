const express = require("express");
const router = express.Router();


const {
  stockIn,
  stockOut,
  getStockHistory,
  getProductStockHistory
} = require("../controllers/stockController");



const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.post("/in", protect, authorize("admin", "manager"), stockIn);
router.post("/out", protect, authorize("admin", "manager"), stockOut);
router.get("/history", protect, authorize("admin", "manager"), getStockHistory);
router.get("/history/:productId", protect, authorize("admin", "manager"), getProductStockHistory);


module.exports = router;