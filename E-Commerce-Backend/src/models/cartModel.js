const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
        _id: false,
      },
    ],

    totalItems: {
      type: Number,
      required: true,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchema);
