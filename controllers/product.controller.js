const {
  getPrdouctService,
  createProductService,
  updateProductByIdService,
  bulkUpdateProductService,
  deleteProductByIdService,
} = require("../services/product.service");

module.exports.getProduct = async (req, res, next) => {
  try {
    const product = await getPrdouctService();

    res.status(200).json({
      status: "success",
      message: "Product found successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
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

module.exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);
    res.status(200).json({
      status: "success",
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Product couldn't update!",
      error: error.message,
    });
  }
};

module.exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: "success",
      message: "Products are updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Products couldn't update!",
      error: error.message,
    });
  }
};


module.exports.deleteProductById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await deleteProductByIdService(id);
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Products couldn't delete!",
      error: error.message,
    });
  }
};
