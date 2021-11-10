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
    res.send("Unauthorized to create product.");
  }
});

// retrieve active products
router.get("/", (req, res) => {
  productController
    .getActiveProducts()
    .then((resultFromController) => res.send(resultFromController));
});

// retrieve all products
router.get("/all", auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  if (userData.isAdmin) {
    productController
      .getAllProducts()
      .then((resultFromController) => res.send(resultFromController));
  } else {
    res.send("Unauthorized to retrieve all products.");
  }
});

// retrieve single product
router.get("/:productId", (req, res) => {
  productController
    .getProduct(req.params)
    .then((resultFromController) => res.send(resultFromController));
});

// update product; admin only
router.put("/:productId/update", auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  if (userData.isAdmin) {
    productController
      .updateProduct(req.params, req.body)
      .then((resultFromController) => res.send(resultFromController));
  } else {
    res.send("Unauthorized to update product");
  }
});

// archiving a product; admin only
router.put("/:productId/archive", auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  if (userData.isAdmin) {
    productController
      .archiveProduct(req.params, req.body)
      .then((resultFromController) => res.send(resultFromController));
  }
});

module.exports = router;
