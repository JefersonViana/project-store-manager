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

const updateById = async (name, id) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [name, id],
  );
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
};
