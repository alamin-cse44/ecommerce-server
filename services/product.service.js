const Product = require("../models/Product");

module.exports.getPrdouctService = async () => {
  console.log("product service");
};

module.exports.createProductService = async (data) => {
  const result = await Product.create(data);
  return result; 
};
