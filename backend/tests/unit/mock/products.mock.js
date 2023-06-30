const productsFromDb = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const responseServiceAll = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const productByIdDb = {
  id: 1,
  name: 'Martelo de Thor',
};

const productByIdModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const responseServiceById = {
  status: 'SUCCESSFUL',
  data: productByIdModel,
};

const responseServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const updateProductDb = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
  },
  undefined,
];

const updateProductModel = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
  },
  undefined,
];

module.exports = {
  productsFromDb,
  productsFromModel,
  responseServiceAll,
  productByIdDb,
  responseServiceById,
  responseServiceNotFound,
  productByIdModel,
  updateProductDb,
  updateProductModel,
};
