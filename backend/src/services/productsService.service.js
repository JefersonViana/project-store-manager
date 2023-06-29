const schema = require('./validations/validationsInputValues');
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

const insertProduct = async (productDataObject) => {
  const error = schema.validateProductCreation(productDataObject);
  if (error) return { status: error.status, data: { message: error.message } };
  
  const insertId = await productsModel.insert(productDataObject.name);
  const createdProduct = { id: insertId, name: productDataObject.name };
  return { status: 'CREATED', data: createdProduct };
};

module.exports = {
  getAllProducts,
  getProductsById,
  insertProduct,
};