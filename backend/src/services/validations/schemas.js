const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5),
});

const salesProducts = Joi.object({
  productId: Joi.number().integer().min(1)
    .message('"productId" must be greater than or equal to 1'),
  quantity: Joi.number().integer().min(1)
    .message('"quantity" must be greater than or equal to 1'),
});

const addSalesSchema = Joi.array().items(salesProducts);

module.exports = {
  addProductSchema,
  addSalesSchema,
};
