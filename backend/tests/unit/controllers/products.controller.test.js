const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productService = require('../../../src/services/productsService.service');
const { getProducts, getByQuery, postProducts, putProduct, deleteProduct } = require('../../../src/controllers/productsController');
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

  it('Testa se é possível adicionar um novo produto.', async function () {
    sinon.stub(productService, 'insertProduct').resolves({ status: 'CREATED', data: { id: 4, name: 'Quebra-Cabeça' } });
    const req = {
      params: {},
      body: { name: 'Quebra-Cabeça' },
      query: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await postProducts(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 4, name: 'Quebra-Cabeça' });
  });

  it('Testa se é possível atualizar um produto.', async function () {
    sinon.stub(productService, 'updateProduct').resolves({ status: 'SUCCESSFUL', data: { id: 4, name: 'Lanterna verde' } });
    const req = {
      params: { id: 4 },
      body: { name: 'Lanterna verde' },
      query: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await putProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 4, name: 'Lanterna verde' });
  });

  it('Testa se não é possível deletar um produto caso ele não exista.', async function () {
    sinon.stub(productService, 'deleteProduct').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
    const req = {
      params: { id: 4 },
      body: {},
      query: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Testa se é possível deletar um produto.', async function () {
    sinon.stub(productService, 'deleteProduct').resolves({ status: 'DELETED' });
    const req = {
      params: { id: 4 },
      body: {},
      query: {},
    };
    const res = {
      sendStatus: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await deleteProduct(req, res);

    expect(res.sendStatus).to.have.been.calledWith(204);
  });

  afterEach(function () {
    sinon.restore();
  });
});