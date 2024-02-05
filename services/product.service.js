const Product = require("../models/Product");

module.exports.getPrdouctService = async () => {
  const result = await Product.find({});
  return result;
};

module.exports.createProductService = async (data) => {
  const result = await Product.create(data);
  return result;
};

module.exports.updateProductService = async (productID, data) => {
  const result = await Product.updateOne(
    { _id: productID },
    { $set: data },
    { runValidators: true }
  );

//   const product = await Product.findById(productID)
//   const result = await product.set(data).save();

  return result;
};
