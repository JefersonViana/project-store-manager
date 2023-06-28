const connection = require('./connection');

const findAll = async () => {
  const [results] = await connection.execute('SELECT * FROM StoreManager.products;');
  return results;
};

const findById = async (productId) => {
  const [[results]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [productId],
  );
  return results || false;
};

module.exports = {
  findAll,
  findById,
};
