const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");
const auth = require("../auth");
const Product = require("../models/Product");

// register
router.post("/register", (req, res) => {
  userController
    .registerUser(req.body)
    .then((resultFromController) => res.send(resultFromController));
});

// user authentication
router.post("/login", (req, res) => {
  userController
    .loginUser(req.body)
    .then((resultFromController) => res.send(resultFromController));
});

// retrieve all users; admin only
router.get("/all", auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  if (userData.isAdmin) {
    userController
      .getAllUsers()
      .then((resultFromController) => res.send(resultFromController));
  } else {
    res.send("Unauthorized to retrieve all users.");
  }
});

// set user as admin; admin only
router.put("/:userId/setAsAdmin", auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  if (userData.isAdmin) {
    userController
      .setAdmin(req.params, req.body)
      .then((resultFromController) => res.send(resultFromController));
  } else {
    res.send("Unauthorized to set admin");
  }
});

// creating an order; authenticated user only
router.post("/checkout", auth.verify, async (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  if (userData.isAdmin == false) {
    let data = {
      userId: userData.id,
      productId: req.body.productId,
      quantity: req.body.quantity,
    };
    const product = await Product.findById(req.body.productId);
    userController
      .checkout(data, product)
      .then((resultFromController) => res.send(resultFromController));
  } else {
    res.send("Admin cannot create order for user.");
  }
});

// retrieving all orders; admin only
router.get("/orders", auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  if (userData.isAdmin) {
    userController
      .getAllOrders()
      .then((resultFromController) => res.send(resultFromController));
  } else {
    res.send("No Access!");
  }
});

// retrieve authenticated user orders
router.get("/myOrders", auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  if (userData.isAdmin == false) {
    userController
      .getUserOrders(userData)
      .then((resultFromController) => res.send(resultFromController));
  } else {
    res.send("No Access!");
  }
});

module.exports = router;
