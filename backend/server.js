const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRouter = require("./routers/productRouter.js");
const userRouter = require("./routers/userRouter.js");
const orderRouter = require("./routers/orderRouter.js");
const AdminBroRouter = require("./admin/adminBro.js");
const filteredProductRouter = require("./routers/filteredProducts.js");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use("/admin", AdminBroRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// we can customize db_url
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/static", express.static(__dirname + "/static"));
app.use("/api/users", userRouter);
app.use("/api/category", filteredProductRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send("sb");
});
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// throw an actual error
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
