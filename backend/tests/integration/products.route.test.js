const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const connection = require('../../src/models/connection');
const { productsFromDb, productsFromModel } = require('./mock/products.mock');
const app = require('../../src/app');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

describe('Realizando teste(integração) - PRODUCTS ROUTE', function () {
  it('Recuperando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDb]);

    const response = await chai.request(app).get('/products/');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productsFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});