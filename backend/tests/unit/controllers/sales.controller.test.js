const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService.service');
const { postSales, deleteSales, updateSales } = require('../../../src/controllers/salesController');

describe('Realizando testes - SALES CONTROLLER', function () {
  it('Testa se é possível adicionar um novo produto.', async function () {
    sinon.stub(salesService, 'insertSales').resolves({
      status: 'CREATED',
      data: {
        id: 3,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 3, quantity: 10 },
        ],
      },
    });
    const req = {
      params: {},
      body: [
        { productId: 1, quantity: 1 },
        { productId: 3, quantity: 10 },
      ],
      query: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await postSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({
      id: 3,
      itemsSold: [
      { productId: 1, quantity: 1 },
      { productId: 3, quantity: 10 },
    ] });
  });

  it('Testa se é possível atualizar um produto.', async function () {
    sinon.stub(salesService, 'updateQuantitySales').resolves({ status: 'SUCCESSFUL', data: { saleId: 1, productId: 2, quantity: 25 } });
    const req = {
      params: { saleId: 1, productId: 2 },
      body: { quantity: 25 },
      query: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await updateSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ saleId: 1, productId: 2, quantity: 25 });
  });

  it('Testa se não é possível deletar um produto caso ele não exista.', async function () {
    sinon.stub(salesService, 'deleteSales').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });
    const req = {
      params: { id: 4 },
      body: {},
      query: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await deleteSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Testa se é possível deletar um produto.', async function () {
    sinon.stub(salesService, 'deleteSales').resolves({ status: 'DELETED' });
    const req = {
      params: { id: 4 },
      body: {},
      query: {},
    };
    const res = {
      sendStatus: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await deleteSales(req, res);

    expect(res.sendStatus).to.have.been.calledWith(204);
  });

  afterEach(function () {
    sinon.restore();
  });
});