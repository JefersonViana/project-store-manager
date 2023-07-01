const express = require('express');
const { salesController } = require('../controllers');
const {
  validateSalesProperties,
  validateUpdateSalesProperty,
} = require('../middlewares/validateSalesProperties');

const route = express();

route.get('/', salesController.getSales);

route.get('/:id', salesController.getSalesById);

route.post(
  '/',
  validateSalesProperties,
  salesController.postSales,
);

route.put(
  '/:saleId/products/:productId/quantity',
  validateUpdateSalesProperty,
  salesController.updateSales,
);

route.delete('/:id', salesController.deleteSales);

module.exports = route;
