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

route.put(
  '/:id',
  validateProductName,
  productsController.putProduct,
);

route.delete('/:id', productsController.deleteProduct);

module.exports = route;
