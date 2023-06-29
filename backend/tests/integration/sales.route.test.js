const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const connection = require('../../src/models/connection');
const { salesFromDb, salesFromModel, salesFindByIdDb, salesFindByIdModel } = require('./mock/sales.mock');
const app = require('../../src/app');
const { salesService } = require('../../src/services');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

describe('Realizando teste(integração) - SALES ROUTE', function () {
  it('Recuperando todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDb]);

    const response = await chai.request(app).get('/sales/');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(salesFromModel);
  });

  it('Testa que passando /sales/10 o res.status seja 404 e req.body seja { message: "Sale not found" }', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const response = await chai.request(app).get('/sales/10');
    
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Testa que passando /sales/10 o res.status seja 200 e req.body seja um array com 2 objetos', async function () {
    sinon.stub(connection, 'execute').resolves([salesFindByIdDb]);

    const response = await chai.request(app).get('/sales/10');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(salesFindByIdModel);
  });

  it('Testa um caso de erro no banco. Espera-se um status 500', async function () {
    sinon.stub(salesService, 'getSalesById').resolves({ status: 'NOT_ERROR', data: { message: 'ERROR_DATABASE' } });

    const response = await chai.request(app).get('/sales/11');
    
    expect(response.status).to.be.equal(500);
    expect(response.body).to.be.deep.equal({ message: 'ERROR_DATABASE' });
  });

  afterEach(function () {
    sinon.restore();
  });
});