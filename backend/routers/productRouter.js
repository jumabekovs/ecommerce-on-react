const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const Product = require("../models/productModel.js");
const fileUpload = require("express-fileupload");
const path = require("path");
const productRouter = express.Router();
const shortid = require("shortid");
const fs = require("fs");
const { isAuth } = require("../utils.js");

/* api for listing of all products */
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const search = req.query.search || "";
    const category = req.query.category;
    const brand = req.query.brand;

    const products = await Product.find({
      $or: [
        search ? { name: { $regex: search, $options: "i" } } : {},
        search ? { category: { $regex: search, $options: "i" } } : {},
      ],
      ...(category ? { category } : {}),
      ...(brand ? { brand } : {}),
    });
    res.send(products);
  })
);

productRouter.post(
  "/",
  isAuth,
  fileUpload(),
  expressAsyncHandler(async (req, res) => {
    let productImage;
    let uploadPath;
    let fileName;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // The name of the input field (i.e. "productImage") is used to retrieve the uploaded file
    productImage = req.files.image;
    fileName = `${shortid.generate()}-${productImage.name}`;
    uploadPath = path.join(__dirname, "..", "/static/images/", fileName);
    try {
      await new Promise((resolve, reject) => {
        // Use the mv() method to place the file somewhere on your server
        productImage.mv(uploadPath, function (err) {
          console.log(uploadPath, err);
          if (err) return reject(err);
          // console.log("File uploaded!! ", uploadPath);
          resolve();
        });
      });
    } catch (e) {
      return res.status(400).json({
        message: "Not a file!",
      });
    }

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: fileName,
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
  isAuth,
  fileUpload(),
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    let productImage;
    let uploadPath;
    let fileName;

    // The name of the input field (i.e. "productImage") is used to retrieve the uploaded file
    productImage = (req.files && req.files.image) || null;
    fileName = productImage && `${shortid.generate()}-${productImage.name}`;
    uploadPath =
      productImage && path.join(__dirname, "..", "/static/images/", fileName);

    try {
      const product = await Product.findById(productId);
      if (product) {
        if (productImage) {
          try {
            const oldImage = path.join(
              __dirname,
              "..",
              "/static/images/",
              product.image
            );

            if (fs.existsSync(oldImage)) {
              fs.unlinkSync(oldImage);
            }
            await new Promise((resolve, reject) => {
              // Use the mv() method to place the file somewhere on your server
              productImage.mv(uploadPath, function (err) {
                if (err) return reject(err);
                resolve();
              });
            });
          } catch (e) {
            return res.status(400).json({
              message: "Not a file!",
            });
          }
        }
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = productImage ? fileName : product.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        const updatedProduct = await product.save();
        if (updatedProduct) {
          return res
            .status(200)
            .send({ message: "Product Updated", data: updatedProduct });
        }
        return res.status(500).send({ message: "Error In Updating Product" });
      }
    } catch (e) {
      return res.json({ message: e });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    try {
      if (deletedProduct) {
        await deletedProduct.remove();
        res.send({ message: "Product Deleted" });
      } else {
        res.send("Error in Deletion");
      }
    } catch (e) {
      return res.json({ message: e });
    }
  })
);

module.exports = productRouter;
