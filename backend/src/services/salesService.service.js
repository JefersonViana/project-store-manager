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

const updateQuantitySales = async ({ saleId, productId, quantity }) => {
  const error = schema.validateUpdateSalesQuantity(quantity);
  if (error) return { status: error.status, data: { message: error.message } };

  const prodExist = await productsModel.findById(productId);
  if (!prodExist) return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };

  const saleExist = await salesModel.updateQuantitySale({ quantity, saleId, productId });
  if (saleExist < 1) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  const responseModel = await salesModel.findSaleByIdWithProductId({ saleId, productId });
  return { status: 'SUCCESSFUL', data: responseModel };
};

const deleteSales = async (id) => {
  const saleExist = await salesModel.saleFindById(id);
  if (!saleExist) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  await salesModel.deleteById(id);
  return { status: 'DELETED' };
};

module.exports = {
  getAllSales,
  getSalesById,
  insertSales,
  productExist,
  deleteSales,
  updateQuantitySales,
};