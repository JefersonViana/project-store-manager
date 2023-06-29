const { salesModel } = require('../models');

const getAllSales = async () => {
  const responseFromDb = await salesModel.findAll();
  if (!responseFromDb) {
    return { status: 'SUCCESSFUL', data: [] };
  }
  return { status: 'SUCCESSFUL', data: responseFromDb };
};

const getSalesById = async (salesId) => {
  const responseFromDb = await salesModel.findById(salesId);
  if (!responseFromDb || responseFromDb.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: responseFromDb };
};

module.exports = {
  getAllSales,
  getSalesById,
};