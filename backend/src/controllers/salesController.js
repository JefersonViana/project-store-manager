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
  const { body } = req;
  const { status, data } = await salesService.insertSales(body);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getSales,
  getSalesById,
  postSales,
};
