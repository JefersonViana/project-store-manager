const express = require('express');
const { productsController } = require('../controllers');

const route = express();

route.get('/', productsController.getProducts);

route.get('/:id', productsController.getProductById);

route.post('/', productsController.postProducts);

module.exports = route;
