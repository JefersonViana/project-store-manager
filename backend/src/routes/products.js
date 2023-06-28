const express = require('express');
const { productsController } = require('../controllers');

const route = express();

route.get('/', productsController.getProducts);

route.get('/:id', productsController.getProductById);

module.exports = route;
