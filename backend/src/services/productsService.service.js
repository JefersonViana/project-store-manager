const { productsModel } = require('../models');

const getAllProducts = async () => {
  const responseFromDb = await productsModel.findAll();
  return { status: 'SUCCESSFUL', data: responseFromDb };
};

const getProductsById = async (productId) => {
  const responseFromDb = await productsModel.findById(productId);
  if (!responseFromDb) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: responseFromDb };
};

const insertProduct = async (nameProduct) => {
  const insertId = await productsModel.insert(nameProduct);
  const createdProduct = { id: insertId, name: nameProduct };
  return { status: 'CREATED', data: createdProduct };
};

module.exports = {
  getAllProducts,
  getProductsById,
  insertProduct,
};