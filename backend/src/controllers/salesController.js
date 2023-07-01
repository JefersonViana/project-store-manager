const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getSales = async (_req, res) => {
  const { status, data } = await salesService.getAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getSalesById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const postSales = async (req, res) => {
  const { status, data } = await salesService.insertSales(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.deleteSales(id);
  if (status === 'DELETED') {
    return res.sendStatus(204);
  }
  
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateSales = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { status, data } = await salesService.updateQuantitySales({ saleId, productId, quantity });
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getSales,
  getSalesById,
  postSales,
  deleteSales,
  updateSales,
};
