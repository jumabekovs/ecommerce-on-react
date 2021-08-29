const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const Product = require("../models/productModel.js");

const productRouter = express.Router();

/* api for listing of all products */
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
      return res
        .status(201)
        .send({ message: "New Product Created", data: newProduct });
    }
    return res.status(500).send({ message: "Error In Creating Product" });
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({}); /* to remove duplicates */
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

/* it is important to set detail api in the end to build right url */
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById({ productId });
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      product.rating = req.body.rating;
      product.numReviews = req.body.numReviews;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: "Product Updated", data: updatedProduct });
      }
    }
    return res.status(500).send({ message: "Error In Updating Product" });
  })
);

module.exports = productRouter;
