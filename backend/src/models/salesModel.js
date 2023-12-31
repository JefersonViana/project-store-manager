const connection = require('./connection');

const findAll = async () => {
  const [results] = await connection.execute(
    `SELECT
      p.sale_id AS saleId,
      s.date,
      p.product_id AS productId,
      p.quantity AS quantity
    FROM StoreManager.sales_products AS p
    INNER JOIN StoreManager.sales AS s
    ON s.id = p.sale_id
    ORDER BY saleId, productId;`,
  );
  return results;
};

const findById = async (salesId) => {
  const [results] = await connection.execute(
    `SELECT
      s.date,
      p.product_id AS productId,
      p.quantity AS quantity
    FROM StoreManager.sales_products AS p
    INNER JOIN StoreManager.sales AS s
    ON s.id = p.sale_id
    WHERE p.sale_id = ?;`,
    [salesId],
  );
  return results;
};

const findSaleByIdWithProductId = async ({ saleId, productId }) => {
  const [[result]] = await connection.execute(
    `SELECT
      sp.sale_id AS saleId,
      sp.product_id AS productId,
      sp.quantity,
      sales.date
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sales
    ON sales.id = sp.sale_id
    WHERE sp.sale_id = ? AND sp.product_id = ?;`,
    [saleId, productId],
  );
  return result;
};

const saleFindById = async (id) => {
  const [[results]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?;',
    [id],
  );
  return results;
};

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ();',
  );
  return insertId;
};

const insertSalesProduct = async (saleProductObject) => {
  const { saleId, productId, quantity } = saleProductObject;
  // const [{ affectedRows }] = SE PRECISAR POSSO USAR PARA VALIDAR SE ALGUMA LINHA FOI ALTERADA. 
  const responseFromDb = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [saleId, productId, quantity],
  );
  return responseFromDb;
};

const updateQuantitySale = async ({ quantity, saleId, productId }) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;',
    [quantity, saleId, productId],
  );
  return affectedRows;
};

const deleteById = async (id) => {
  const results = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [id],
  );
  return results;
};

module.exports = {
  findAll,
  findById,
  insertSales,
  insertSalesProduct,
  deleteById,
  saleFindById,
  updateQuantitySale,
  findSaleByIdWithProductId,
};
