const express = require("express");
const {
  getProducts,
  getFilteredProducts,
  saveProduct,
} = require("../services/products");

const router = express.Router();


router.get("/api/productos", (req, res) => {
  const products = getProducts();
  res.status(200).send({ products: products });
});

router.get("/api/productos/:id", (req, res) => {
  const id = req.params.id;
  const filter = getFilteredProducts(id);
  res.status(200).send({ product: filter });
});

router.post("/api/productos", (req, res) => {
  let productosIn = req.body;
  saveProduct(productosIn);
  res.status(200).send({ message: "Producto agregado correctamente" });
});

module.exports = router;