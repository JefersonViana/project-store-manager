const express = require('express');
const { productsController } = require('../controllers');
const validateProductName = require('../middlewares/validateProductName');

const route = express();

route.get('/', productsController.getProducts);

route.get('/:id', productsController.getProductById);

route.post(
  '/',
  validateProductName,
  productsController.postProducts,
);

module.exports = route;
