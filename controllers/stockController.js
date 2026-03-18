const Product = require("../models/Product");
const StockMovement = require("../models/StockMovement");

const stockIn = async (req, res) => {

  try {
    const { productId, quantity } = req.body;

    const product = await Product.findOne({
      _id: productId,
      isDeleted: false
    });

    if (!product) {
      return res.status(404).json({ message: "produit introuvable" });
    }


    product.stock += Number(quantity);
    await product.save();

    const movement = await StockMovement.create({
      product: product._id,
      type: "IN",
      quantity,
      doneBy: req.user._id
    });

    res.json({
      product,
      movement
    });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const stockOut = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findOne({
      _id: productId,
      isDeleted: false
    });

    if (!product) {
      return res.status(404).json({ message: "produit non trouvable" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "stock insuffisant" });
    }

    product.stock -= Number(quantity);
    await product.save();

    const movement = await StockMovement.create({
      product: product._id,
      type: "OUT",
      quantity,
      doneBy: req.user._id
    });

    res.json({
      product,
      movement
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStockHistory = async (req, res) => {
  try {
    const history = await StockMovement.find()
      .populate("product")
      .populate("doneBy", "-password")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductStockHistory = async (req, res) => {
  try {
    const history = await StockMovement.find({ product: req.params.productId })
      .populate("product")
      .populate("doneBy", "-password")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  stockIn,
  stockOut,
  getStockHistory,
  getProductStockHistory
};