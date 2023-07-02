const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const checkRequiredField = require('../../../src/utils/checkRequiredField');
const { validateProductName } = require('../../../src/middlewares/validateProductName');

describe('Testando Middlewares', function () {
  it('Testando a função que valida o nome do produto: testa se retorna erro caso não seja a propriedade "name".', async function () {
    sinon.stub(checkRequiredField, 'checkRequiredField').returns('"name" is required');
    const req = {
      params: {},
      body: { produto: 'Nome válido' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await validateProductName(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Testando a função que valida o nome do produto.', async function () {
    sinon.stub(checkRequiredField, 'checkRequiredField').returns(undefined);
    const req = {
      params: {},
      body: { name: 'Nome válido' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await validateProductName(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});