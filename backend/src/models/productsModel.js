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
  return results;
};

const insert = async (nameProduct) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [nameProduct],
  );
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};
