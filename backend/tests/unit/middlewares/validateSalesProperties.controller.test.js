const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const checkRequiredField = require('../../../src/utils/checkRequiredField');
const { validateSalesProperties, validateUpdateSalesProperty } = require('../../../src/middlewares/validateSalesProperties');

describe('Testando Middlewares para propriedades', function () {
  it('Testando a função que valida o nome do produto e quantidade: testa se retorna erro caso não seja a propriedade "quantity".', async function () {
    sinon.stub(checkRequiredField, 'checkRequiredField')
      .onFirstCall()
      .returns(undefined)
      .onSecondCall()
      .returns('"quantity" is required');
    const req = {
      params: {},
      body: [
        { productId: 1, quantity: 10 },
        { productId: 3, quantidade: 5 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await validateSalesProperties(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Testando a função que valida o nome do produto.', async function () {
    sinon.stub(checkRequiredField, 'checkRequiredField')
      .onFirstCall()
      .returns(undefined)
      .onSecondCall()
      .returns(undefined);
    const req = {
      params: {},
      body: [
        { productId: 1, quantity: 10 },
        { productId: 3, quantity: 5 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await validateSalesProperties(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Testando a função que valida a quantidade de produto que será atualizado: testa se retorna erro caso não seja a propriedade "quantity".', async function () {
    sinon.stub(checkRequiredField, 'checkRequiredField').returns('"quantity" is required');
    const req = {
      params: {},
      body: { quntity: 10 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await validateUpdateSalesProperty(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Testando a função que valida a quantidade de produto com sucesso.', async function () {
    sinon.stub(checkRequiredField, 'checkRequiredField').returns(undefined);
    const req = {
      params: {},
      body: { quantity: 10 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await validateUpdateSalesProperty(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});