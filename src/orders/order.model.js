const mongoose = require("mongoose");

const orderSchena = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: { type: String },
      state: { type: String },
      zipcode: { type: String },
    },
    phone: {
      type: Number,
      required: true,
    },
    productsIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchena);
module.exports = Order;
