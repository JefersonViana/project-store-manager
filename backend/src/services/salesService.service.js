const { salesModel } = require('../models');

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

const insertSales = async (arrSales) => {
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