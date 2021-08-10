const express = require("express");
const sgMail = require("@sendgrid/mail");
const random = require("random");

const app = express();

app.use(express.json());

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

app.get("/api/productos", (req, res) => {
  res.status(200).send({ productos: productos });
});

app.get("/api/productos/:id", (req, res) => {
  var id = req.params.id;
  let detalleProducto = productos.find((producto) => producto._id == id);
  res.status(200).send({ producto: detalleProducto });
});

app.post("/api/productos", (req, res) => {
  let id = random.int((min = 1), (max = 10000000));
  let productosIn = req.body;
  productosIn._id = id;
  productos.push(productosIn);
  res.status(200).send({ message: "Producto agregado correctamente" });
});

app.post("api/email", (req, res) => {
  let destinario = req.body.destinatario;
  let mensaje = req.body.mensaje;
  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: destinario,
    from: "zuleta-96@hotmail.com",
    subject: "Compra realizada correctamente",
    // template_id: "d-8ddf7bec1f2a40269efdf52697670c41",
    // subject: "Compra realizada correctamente",
    // personalizations: [
    //   {
    //     to: [
    //       {
    //         email: destinario,
    //       },
    //     ],
    //     substitutions: {
    //       first_name: "Camilo",
    //       "%CustomerID%": "CUSTOMER ID GOES HERE",
    //     },
    //     subject: "Compra realizada correctamente",
    //   },
    // ],
    text: mensaje,
    html: "<strong>Tu compra se ha realizado correctamente en Ecommerce-DevF. ¡Muchas gracias!</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send({ message: "Email enviado correctamente" });
    })
    .catch((error) => {
      res.status(error.code).send({ error });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
