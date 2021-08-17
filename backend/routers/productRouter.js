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

module.exports = productRouter;
