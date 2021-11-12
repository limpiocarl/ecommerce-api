const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// register
module.exports.registerUser = (reqBody) => {
  let newUser = new User({
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    email: reqBody.email,
    password: bcrypt.hashSync(reqBody.password, 11),
  });
  return newUser.save().then((user, err) => {
    if (err) {
      return false;
    } else {
      return `${newUser.firstName} ${newUser.lastName} is now registered`;
    }
  });
};

// user authentication
module.exports.loginUser = (reqBody) => {
  return User.findOne({ email: reqBody.email }).then((result) => {
    if (result == null) {
      return "User not found";
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        reqBody.password,
        result.password
      );
      if (isPasswordCorrect) {
        return { access: auth.createAccessToken(result) };
      } else {
        return "Invalid Password";
      }
    }
  });
};

// set user as admin; admin only
module.exports.setAdmin = (reqParams, reqBody) => {
  return User.findByIdAndUpdate(reqParams.userId).then((result) => {
    result.isAdmin = reqBody.isAdmin;
    return result.save().then((newAdmin, err) => {
      if (err) {
        return false;
      } else {
        return `${result.firstName} ${result.lastName} has been successfully set as an admin.`;
      }
    });
  });
};

// checkout
module.exports.checkout = async (data, productData) => {
  let addToCart = await User.findById(data.userId).then((user) => {
    user.cart.push({
      productId: data.productId,
      quantity: data.quantity,
      totalAmount: productData.price * data.quantity,
    });
    return user.save().then((user, err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  });
  let processOrder = await Product.findById(data.productId).then((product) => {
    product.order.push({
      userId: data.userId,
      quantity: data.quantity,
      totalAmount: productData.price * data.quantity,
    });
    return product.save().then((product, err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  });
  if (addToCart && processOrder) {
    return "Order successfully processed.";
  } else {
    return false;
  }
};

// retrieving all orders; admin only
module.exports.getAllOrders = () => {
  return User.find({})
    .select("firstName lastName cart")
    .then((result) => {
      return result;
    });
};

// retrieving authenticated user orders
module.exports.getUserOrders = (user) => {
  return User.findById(user.id)
    .select("cart -_id")
    .then((result) => {
      return result;
    });
};
