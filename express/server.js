const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const router = express.Router();

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

const port = 3000;
const SENDGRID_API_KEY =
  "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";

const productos = [
  {
    product_name: "Set ganchos para ropa",
    category: "Hogar",
    description: "Set de ganchos x 10 para tender ropa",
    image:
      "https://miscelandia.vteximg.com.br/arquivos/ids/172002-800-800/WHITMOR_GANCHOSDEROPA_6672533_038861631187_01.jpg?v=636088516832300000",
    isActive: true,
    price: 12000,
    _id: 452885,
  },
  {
    product_name: "Plancha de ropa",
    category: "Electrodomesticos",
    description: "Plancha para todo tipo de ropa",
    image:
      "https://falabella.scene7.com/is/image/FalabellaCO/11502015_1?wid=800&hei=800&qlt=70",
    isActive: true,
    price: 25000,
    _id: 1100221,
  },
];

router.get("/api/productos", (req, res) => {
  res.status(200).send({ productos: productos });
});

router.get("/api/productos/:id", (req, res) => {
  var id = req.params.id;
  let detalleProducto = productos.find((producto) => producto._id == id);
  res.status(200).send({ producto: detalleProducto });
});

router.post("/api/productos", (req, res) => {
  let id = random.int((min = 1), (max = 10000000));
  let productosIn = req.body;
  productosIn._id = id;
  productos.push(productosIn);
  res.status(200).send({ message: "Producto agregado correctamente" });
});


app.use("/.netlify/functions/server", router);
module.exports = app;
module.exports.handler = serverless(app);
