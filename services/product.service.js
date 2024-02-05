const Product = require("../models/Product");

module.exports.getPrdouctService = async () => {
  const result = await Product.find({});
  return result;
};

module.exports.createProductService = async (data) => {
  const result = await Product.create(data);
  return result; 
};
