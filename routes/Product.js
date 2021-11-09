const express = require("express");
const router = express.Router();
const productController = require("../controllers/Product");
const auth = require("../auth");

// create product; admin only
router.post("/create", auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  if (userData.isAdmin) {
    productController
      .createProduct(req.body)
      .then((resultFromController) => res.send(resultFromController));
  } else {
    res.send("Not Authorized to create product.");
  }
});

// retrieve active products
router.get("/", (req, res) => {
  productController
    .getActiveProducts()
    .then((resultFromController) => res.send(resultFromController));
});

// retrieve all products
router.get("/all", (req, res) => {
  productController
    .getAllProducts()
    .then((resultFromController) => res.send(resultFromController));
});

module.exports = router;
