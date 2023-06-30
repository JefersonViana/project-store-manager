const schema = require('./validations/validationsInputValues');
const { salesModel, productsModel } = require('../models');

const getAllSales = async () => {
  const responseFromDb = await salesModel.findAll();
  return { status: 'SUCCESSFUL', data: responseFromDb };
};

const getSalesById = async (salesId) => {
  const responseFromDb = await salesModel.findById(salesId);
  if (!responseFromDb || responseFromDb.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: responseFromDb };
};

const productExist = async (array) => {
  const response = await Promise.all(array.map(async ({ productId }) => {
    const product = await productsModel.findById(productId);
    console.log('product', typeof product);
    return typeof product === 'object';
  }));
  return response.every((bolean) => bolean === true);
};

const insertSales = async (arrSales) => {
  const error = schema.validateSalesCreation(arrSales);
  if (error) return { status: error.status, data: { message: error.message } };

  const productExists = await productExist(arrSales);
  if (!productExists) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  const insertId = await salesModel.insertSales();
  arrSales.forEach(async (sale) => {
    await salesModel.insertSalesProduct({
      saleId: insertId, productId: sale.productId, quantity: sale.quantity,
    });
  });
  const createdSales = { id: insertId, itemsSold: arrSales };
  return { status: 'CREATED', data: createdSales };
};

module.exports = {
  getAllSales,
  getSalesById,
  insertSales,
};