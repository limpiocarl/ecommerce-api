const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  description: {
    type: String,
    required: [true, "Describe your product."],
  },
  price: {
    type: Number,
    required: [true, "Set a price."],
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  order: [
    {
      userId: {
        type: String,
        required: [true, "Customer is required."],
      },
      quantity: {
        type: String,
        default: 1,
      },
      totalAmount: {
        type: Number,
        default: 0,
      },
      purchasedOn: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
