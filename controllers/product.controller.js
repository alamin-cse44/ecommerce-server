const {
  getPrdouctService,
  createProductService,
  updateProductByIdService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.service");

module.exports.getProduct = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //http://localhost:5000/api/v1/product?price[gt]=500
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);
    console.log(filters);

    const queries = {};
    if (req.query.sort) {
      // http://localhost:5000/api/v1/product?sort=name,price&fields=name,price&limit=2
      // price,quantity ----> price quantity
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log("sortBy ", sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.limit) {
      const limitBy = req.query.limit;
      queries.limitBy = limitBy;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const product = await getPrdouctService(filters, queries);

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
    const { id } = req.params;
    const result = await deleteProductByIdService(id);
    if (!result.deletedCount) {
      res.status(400).json({
        status: "fail",
        error: "Product couldn't delete",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Product couldn't delete!",
      error: error.message,
    });
  }
};

module.exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);
    res.status(200).json({
      status: "success",
      message: "Products are deleted successfully!",
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
