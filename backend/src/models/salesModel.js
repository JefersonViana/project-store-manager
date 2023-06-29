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

module.exports = {
  findAll,
  findById,
  insertSales,
  insertSalesProduct,
};
