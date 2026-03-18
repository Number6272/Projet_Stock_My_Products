const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  type: {
    type: String,
    enum: ["IN", "OUT"],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  doneBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("StockMovement", stockMovementSchema);