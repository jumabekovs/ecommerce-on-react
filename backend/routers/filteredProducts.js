const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel.js");

const filteredProductRouter = express.Router();

/* it is important to set detail api in the end to build right url */
filteredProductRouter.get(
  "/:category",
  expressAsyncHandler(async (req, res) => {
    try {
      const { category } = req.params;
      const products = await Product.find({ category });
      if (products) {
        res.send(products);
      } else {
        res.status(404).send({ message: "Products Not Found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  })
);

module.exports = filteredProductRouter;
