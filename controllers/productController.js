const Product = require("../models/Product");
const Category = require("../models/Category");


const createProduct = async (req, res) => {

  try {
    const { name, description, price, category } = req.body;

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({ message: "categorieintrouvable" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {


  try {
    const products = await Product.find({ isDeleted: false })
      .populate("category")
      .sort({ createdAt: -1 });

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: false
    }).populate("category");

    if (!product) {
      return res.status(404).json({ message: "produit introuvable" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {

    const { name, description, price, category } = req.body;

    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: false
    });

    if (!product) {
      return res.status(404).json({ message: "produit introuvable" });
    }

    if (category) {
      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(404).json({ message: "categorie introuvable" });
      }

      product.category = category;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price ?? product.price;

    await product.save();

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const softDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: false
    });

    if (!product) {
      return res.status(404).json({ message: "produit non trouvable" });
    }

    product.isDeleted = true;
    await product.save();

    res.json({ message: "produit supprime" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  softDeleteProduct
};

