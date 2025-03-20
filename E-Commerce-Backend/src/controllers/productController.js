const productModel = require("../models/productModel");
const { isValid } = require("./validator");
const mongoose = require("mongoose");

const addProduct = async (req, res) => {
  try {
    let productData = req.body;
    if (Object.keys(productData).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }

    let {
      pImage,
      title,
      description,
      price,
      stock,
      ratings,
      isFreeShipping,
      isDeleted,
      deletedAt,
    } = productData;

    if (!isValid(pImage)) {
      return res.status(400).json({ msg: "Product Image is required" });
    }

    // Product Title Validation
    if (!isValid(title)) {
      return res.status(400).json({ msg: "Title is required" });
    }
    if (!isValid(description)) {
      return res.status(400).json({ msg: "Description is required" });
    }
    if (!isValid(price)) {
      return res.status(400).json({ msg: "Price is required" });
    }
    if (!isValid(stock)) {
      return res.status(400).json({ msg: "Stock is required" });
    }
    if (typeof ratings !== "number" || ratings < 0 || ratings > 5) {
      return res.status(400).json({ msg: "Invalid Ratings" });
    }
    if (
      typeof isFreeShipping !== "undefined" &&
      typeof isFreeShipping !== "boolean"
    ) {
      return res
        .status(400)
        .json({ msg: "isFreeShipping must be a boolean value" });
    }
    if (typeof isDeleted !== "undefined" && typeof isDeleted !== "boolean") {
      return res
        .status(400)
        .json({ msg: "isDeleted at must be a boolean value" });
    }
    if (typeof deletedAt !== "undefined" && typeof isDeleted !== "boolean") {
      return res.status(400).json({ msg: "deleted at must be a date formate" });
    }

    let newProducts = {
      pImage,
      title,
      description,
      price,
      stock,
      ratings,
      isFreeShipping: isFreeShipping || false,
      isDeleted: isDeleted || false,
      deletedAt: isDeleted ? new Date() : null,
    };

    let products = await productModel.create(newProducts);
    return res
      .status(201)
      .json({ msg: "Product Added Successfully", products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Get Products
const getProducts = async (req, res) => {
  try {
    let products = await productModel.find({
      isDeleted: false},
      { _id: 0,
      __v: 0,
      deletedAt: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!products.length) {
      return res.status(404).json({ msg: " No Product Found" });
    }
    return res.status(201).json({ msg: "Products Get Successfully", products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get Products  By Id

const getProductById = async (req, res) => {
  try {
    let productId = req.prams.productId;
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ msg: "InvalidProduct Id" });
    }
    let product = await productModel
      .findById(productId, { isDeleted: false })
      .select("-__v");

    if (!product) {
      return res.status(404).json({ msg: "Product Not Found" });
    }
    return res
      .status(200)
      .json({ msg: "Product Getted Successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Product Update

const updateProduct = async (req, res) => {
  try {
    let productData = req.body;
    if (Object.keys(productData).length === 0) {
      return res.status(400).json({ msg: "No Data TO Update" });
    }

    let productId = req.prams.productId;
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ msg: "Invalid Product Id" });
    }

    let { pImage, title, description, price, stock, ratings, isFreeShipping } =
      productData;

    // Prodcut Image Validation

    if (pImage && !isValid(pImage)) {
      return res.status(400).json({ msg: "Product Image is required" });
    }

    // Product Title Validation
    if (title) {
      if (!isValid(title)) {
        return res.status(400).json({ msg: "Title is required" });
      }
      const checkDuplicateProductTitle = await productModel.findOne({ title });
      if (checkDuplicateProductTitle) {
        res.status(400).json({ msg: " Product Title is required " });
      }
    }

    // Product Description Validation
    if (description) {
      if (!isValid(description)) {
        return res.status(400).json({ msg: "Product Description is Required" });
      }
    }

    // Product Price Validation
    if (price) {
      if (!isValid(price)) {
        return res.status(400).json({ msg: "Product Price is Required" });
      }

      if (typeof price !== "number") {
        return res.status(400).json({ msg: "Invalid Price" });
      }
    }

    // Product Stock Validation
    if (stock) {
      if (!isValid(stock) || typeof stock !== "number" || stock < 0) {
        return res
          .status(400)
          .json({ msg: "Valid Stock Quantity is Required" });
      }
    }

    // Product Rating Validation
    if (ratings) {
      if (typeof ratings !== "number" || ratings < 0 || ratings > 5) {
        return res.status(400).json({ msg: "Invalid Rating" });
      }
    }

    // Free Shipping Validation
      if (
        typeof isFreeShipping !== "undefined" &&
        typeof isFreeShipping !== "boolean"
      ) {
        return res
          .status(400)
          .json({ msg: "isFreeShipping must be a boolean value" });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      productData,
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ msg: "Product Not Found" });
    }
    return res
      .status(200)
      .json({ msg: " Product Data Updated Successfully", updatedProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Inernal Server Error" });
  }
};

// Prodcut Delete

const deleteProduct = async (req, res) => {
  try {
    let productId = req.params.productId;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ msg: "Invalid Product ID" });
    }

    let deletedProduct = await productModel.findOneAndUpdate(
      { _id: productId, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!deletedProduct) {
      return res.status(404).json({ msg: "Product Not Found or Already Deleted" });
    }

    return res.status(200).json({ msg: `${deletedProduct.title} has been deleted`, deletedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
