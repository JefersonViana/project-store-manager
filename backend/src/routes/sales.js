const express = require('express');
const { salesController } = require('../controllers');

const route = express();

route.get('/', salesController.getSales);

route.get('/:id', salesController.getSalesById);

module.exports = route;
