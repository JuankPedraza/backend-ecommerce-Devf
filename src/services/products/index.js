const random = require('random');

const products = [
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

const getProducts = () => {
  return products;
};

const getFilteredProducts = (searchTem) => {
  return products.find((producto) => producto._id == searchTem);
};

const saveProduct = (productosIn) => {
  let id = random.int((min = 1), (max = 10000000));
  productosIn._id = id;

  return products.push(productosIn);
};

module.exports = {
  getProducts,
  getFilteredProducts,
  saveProduct,
};
