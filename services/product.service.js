const Product = require("../models/Product");

module.exports.getPrdouctService = async (filters, queries) => {
  const result = await Product.find({})
    .select(queries.fields)
    .sort(queries.sortBy)
    .limit(queries.limitBy);
  return result;
};

module.exports.createProductService = async (data) => {
  const result = await Product.create(data);
  return result;
};

module.exports.updateProductByIdService = async (productID, data) => {
  const result = await Product.updateOne(
    { _id: productID },
    { $set: data },
    { runValidators: true }
  );

  //   const product = await Product.findById(productID)
  //   const result = await product.set(data).save();

  return result;
};

module.exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  //   {
  //     "ids": [
  //         "65c0ff6ff1d9d1f4a6799c10",
  //         "65c1094d19d9812407c76b58"
  //     ],
  //     "data": {
  //         "price": 400
  //     }
  // }

  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);

  return result;
};

module.exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });

  return result;
};

module.exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });

  return result;
};
