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

module.exports = {
  getProducts,
  getProductById,
};
