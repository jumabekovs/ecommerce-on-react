const express = require("express");
const data = require("./data.js");

const app = express();

app.get("/api/products/", (req, res) => {
  res.send(data);
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});