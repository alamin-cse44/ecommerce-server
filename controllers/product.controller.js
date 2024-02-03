const {
  getPrdouctService,
  createProductService,
} = require("../services/product.service");

module.exports.getProduct = async (req, res, next) => {
  const product = await getPrdouctService();
};

module.exports.createProduct = async (req, res, next) => {
  try {
    const product = await createProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "Product inserted successfully!",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted!",
      error: error.message,
    });
  }
};
