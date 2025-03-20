const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  try {
    let cartData = req.body;
    let { userId, productId, quantity } = cartData;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ msg: "Invalid User Id" });
    }

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ msg: "Invalid Product Id" });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ msg: "Quantity must be at least 1" });
    }
    const product = await productModel.findOne({
      _id: productId,
      isDeleted: false,
    });
    if (!product) {
      return res.status(404).json({ msg: "Product Not found" });
    }

    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User Not found" });
    }

    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = await cartModel.create({
        userId,
        items: [{ productId, quantity }],
        totalPrice: product.price * quantity,
        totalItems: 1,
      });
    } else {
      let productExist = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (productExist) {
        productExist.quantity += 1;
      } else {
        cart.items.push({ productId, quantity });
        cart.totalItems += 1;
      }
      cart.totalPrice += product.price * quantity;
      await cart.save();
    }
    return res
      .status(200)
      .json({ msg: "Product Added to Cart Successfully ", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getAllCarts = async (req, res) => {
  try {
    console.log(req.headers.origin);
    console.log(req);
    let cart = await cartModel.find();
    if (!cart.length) {
      return res.status(200).json({ msg: "No Cart Found" });
    }
    return res.status(200).json({ cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
const getCarts = async (req, res) => {
  try {
    let { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ msg: "Invalid UserId" });
    }

    let cart = await cartModel.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ msg: "Cart is Empty" });
    }
    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const removeCart = async (req, res) => {
  try {
    if(Object.keys(req.body).length === 0){
      return res.status(400).json({msg:"Bad Rerquest"})
    }
    let { userId, productId } = req.body;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ msg: "Invalid userId" });
    }
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ msg: "Invalid ProductId" });
    }

    let cart = await cartModel.findOne({userId});
    if(!cart){
      return res.status(404).json({nsg:"Cart Not Found"});
    }

    let productExist = cart.items.findIndex((item)=> item.productId.toString()===productId);

    if(productExist === -1){
      return res.status(404).json({msg:"Product Not Found in Cart"});
    }
    let product = await productModel.findById(productId);
    cart.totalPrice -= cart.items[productExist].quantity*product.price;
    cart.items.splice(productExist,1);
    cart.totalItems = cart.items.length;

    await cart.save();
    return res.status(200).json({msg:"Product Removed from cart",cart});

  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Internal Server Error" });
  }
};
module.exports = { addToCart, getAllCarts, getCarts, removeCart };
