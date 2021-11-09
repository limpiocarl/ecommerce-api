const Product = require("../models/Product");

// create product
module.exports.createProduct = (reqBody) => {
  let newProduct = new Product({
    name: reqBody.name,
    description: reqBody.description,
    price: reqBody.price,
    isActive: reqBody.isActive,
  });
  return newProduct.save().then((product, err) => {
    if (err) {
      console.log(err);
    } else {
      return `${newProduct.name} has been successfully created.`;
    }
  });
};

// only retrieve active products
module.exports.getActiveProducts = () => {
  return Product.find({ isActive: true }).then((result) => {
    return result;
  });
};

// retrieve all products
module.exports.getAllProducts = () => {
  return Product.find({}).then((result) => {
    return result;
  });
};
