const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, default: 0, required: true },
    countInStock: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: false },
    numReviews: { type: Number, default: 0, required: false },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
