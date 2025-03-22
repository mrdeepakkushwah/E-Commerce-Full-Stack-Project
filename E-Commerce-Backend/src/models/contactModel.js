const mongoose = require("mongoose");

const contactShema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNo: {
      type: Number,
      trim: true,
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact',contactShema);
