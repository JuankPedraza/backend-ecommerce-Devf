const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const productRoutes = require("./api/productos");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(bodyParser.json());
app.use("/.netlify/functions/server", productRoutes);

module.exports = app;
module.exports.handler = serverless(app);
