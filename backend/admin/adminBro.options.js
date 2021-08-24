const User = require("../models/userModel.js");
const Product = require("../models/productModel.js");
const Order = require("../models/orderModel.js");

const AdminBroOptions = {
  // databases: [db],
  resources: [User, Product, Order],
  rootPath: "/admin",
  name: "Admin",
  branding: {
    companyName: "Admin Panel",
    favicon: "/favicon.ico",
  },
};

module.exports = AdminBroOptions;
