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
      return false;
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

// retrieve single product
module.exports.getProduct = (reqParams) => {
  return Product.findById(reqParams.productId).then((result) => {
    return result;
  });
};

// update product; admin only
module.exports.updateProduct = (reqParams, reqBody) => {
  return Product.findByIdAndUpdate(reqParams.productId).then((result) => {
    result.name = reqBody.name;
    result.description = reqBody.description;
    result.price = reqBody.price;
    return result.save().then((updatedProduct, err) => {
      if (err) {
        return false;
      } else {
        return `${result.name} has been successfully updated.`;
      }
    });
  });
};

// archiving a product; admin only
module.exports.archiveProduct = (reqParams, reqBody) => {
  return Product.findByIdAndUpdate(reqParams.productId).then((result) => {
    result.isActive = reqBody.isActive;
    return result.save().then((archivedProduct, err) => {
      if (err) {
        return false;
      } else {
        return `${result.name} has been successfully archived.`;
      }
    });
  });
};
