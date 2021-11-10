const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Firstname is required."],
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "You need to create password."],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: [
    {
      productId: {
        type: String,
        required: [true, "No items!"],
      },
      quantity: {
        type: Number,
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

module.exports = mongoose.model("User", userSchema);
