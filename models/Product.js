const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      unique: [true, "Product must be a unique name"],
      lowercase: true,
      minLength: [3, "Name should be at least three characters"],
      maxLength: [100, "Name should not be more than 100 characters"],
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer",
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    discount: Number,
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock"],
        message: "status can't be {VALUE}",
      },
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
