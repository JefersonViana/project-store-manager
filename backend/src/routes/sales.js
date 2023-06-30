const express = require('express');
const { salesController } = require('../controllers');
const validateSalesProperties = require('../middlewares/validateSalesProperties');

const route = express();

route.get('/', salesController.getSales);

route.get('/:id', salesController.getSalesById);

route.post(
  '/',
  validateSalesProperties,
  salesController.postSales,
);

module.exports = route;
