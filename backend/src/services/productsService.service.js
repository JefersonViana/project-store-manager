const { productsModel } = require('../models');

const getAllProducts = async () => {
  const responseFromDb = await productsModel.findAll();
  if (!responseFromDb) {
    return { status: 'SUCCESSFUL', data: [] };
  }
  return { status: 'SUCCESSFUL', data: responseFromDb };
};

const getProductsById = async (productId) => {
  const responseFromDb = await productsModel.findById(productId);
  if (!responseFromDb) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: responseFromDb };
};

module.exports = {
  getAllProducts,
  getProductsById,
};