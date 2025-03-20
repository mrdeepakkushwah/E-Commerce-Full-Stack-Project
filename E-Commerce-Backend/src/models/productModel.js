const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    pImage: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    ratings: {
      type: Number,
      default:0,
      min:0,
      max:5,
    },
    
    isFreeShipping: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt:{
      type:Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
