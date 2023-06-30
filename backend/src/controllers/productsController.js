const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getProducts = async (_req, res) => {
  const { status, data } = await productService.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.getProductsById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const postProducts = async (req, res) => {
  const { status, data } = await productService.insertProduct(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const putProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productService.updateProduct({ name, id });
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.deleteProduct(id);
  if (status === 'DELETED') {
    return res.sendStatus(204);
  }
  
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getProducts,
  getProductById,
  postProducts,
  putProduct,
  deleteProduct,
};
