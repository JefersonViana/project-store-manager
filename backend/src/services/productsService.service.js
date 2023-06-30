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

const updateProduct = async ({ name, id }) => {
  const error = schema.validateProductCreation({ name });
  if (error) return { status: error.status, data: { message: error.message } };

  const productExist = await productsModel.findById(id);
  if (!productExist) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await productsModel.updateById(name, id);
  const responseFromDb = await productsModel.findById(id);
  return { status: 'SUCCESSFUL', data: responseFromDb };
};

const deleteProduct = async (id) => {
  const productExist = await productsModel.findById(id);
  if (!productExist) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await productsModel.deleteById(id);
  return { status: 'DELETED' };
};

module.exports = {
  getAllProducts,
  getProductsById,
  insertProduct,
  updateProduct,
  deleteProduct,
};