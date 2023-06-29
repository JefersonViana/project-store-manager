const date = '2023-06-29T00:18:04.000Z';

const salesFromDb = [
  {
    saleId: 1,
    date,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date,
    productId: 3,
    quantity: 15,
  },
];

const salesFromModel = [
  {
    saleId: 1,
    date,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date,
    productId: 3,
    quantity: 15,
  },
];

const salesFindByIdDb = [
  {
    date,
    productId: 1,
    quantity: 5,
  },
  {
    date,
    productId: 2,
    quantity: 10,
  },
];

const salesFindByIdModel = [
  {
    date,
    productId: 1,
    quantity: 5,
  },
  {
    date,
    productId: 2,
    quantity: 10,
  },
];

const inputData = {
  saleId: 3,
  productId: 1,
  quantity: 1,
};

const addSalesInDb = [
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

const addSalesInModel = [
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

const responseServiceAll = {
  status: 'SUCCESSFUL',
  data: [
    {
      saleId: 1,
      date,
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date,
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date,
      productId: 3,
      quantity: 15,
    },
  ],
};

const responseServiceById = {
  status: 'SUCCESSFUL',
  data: [
    {
      date,
      productId: 1,
      quantity: 5,
    },
    {
      date,
      productId: 2,
      quantity: 10,
    },
  ],
};

const inputDataService = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const responseDataService = {
  status: 'CREATED',
  data: {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
};

module.exports = {
  salesFromDb,
  salesFromModel,
  salesFindByIdDb,
  salesFindByIdModel,
  inputData,
  addSalesInModel,
  addSalesInDb,
  responseServiceAll,
  responseServiceById,
  inputDataService,
  responseDataService,
};
