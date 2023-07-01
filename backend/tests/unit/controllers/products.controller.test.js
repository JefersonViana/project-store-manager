const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productService = require('../../../src/services/productsService.service');
const { getProducts, getByQuery } = require('../../../src/controllers/productsController');
const { productsFromModel, productsFromDb, queryForService, queryForController } = require('../mock/products.mock');

describe('Realizando testes - PRODUCTS CONTROLLER', function () {
  it('Testa se é possivel recuperar todos os produtos', async function () {
    sinon.stub(productService, 'getAllProducts').resolves({ status: 'SUCCESSFUL', data: productsFromDb });
    const req = {
      params: {},
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Testa se é possivel recuperar todos os produtos que tenha o termo "Thor"', async function () {
    sinon.stub(productService, 'getByForQuery').resolves({ status: 'SUCCESSFUL', data: queryForService });
    const req = {
      params: {},
      body: {},
      query: { q: 'Thor' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getByQuery(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(queryForController);
  });

  it('Testa se é retornado todos os produtos caso não seja passado nenhum termo.', async function () {
    sinon.stub(productService, 'getAllProducts').resolves({ status: 'SUCCESSFUL', data: productsFromDb });
    const req = {
      params: {},
      body: {},
      query: { q: '' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getByQuery(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});