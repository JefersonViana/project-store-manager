const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const connection = require('../../src/models/connection');
const { productsFromDb, productsFromModel, productFindByIdDb, productFindByIdModel } = require('./mock/products.mock');
const app = require('../../src/app');
const { productsModel } = require('../../src/models');
// const { productService } = require('../../src/services');

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

  it('Recuperando um produto por id', async function () {
    // const responseService = { status: 'SUCCESSFUL', data: productFindByIdDb };
    sinon.stub(connection, 'execute').resolves([productFindByIdDb]);
    sinon.stub(productsModel, 'findById').resolves(productFindByIdDb);
    // sinon.stub(productService, 'getProductsById').resolves(responseService);

    const response = await chai.request(app).get('/products/1');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productFindByIdModel);
  });

  it('Testa se passar um id invalido é retornado um { message: "Product not found" }', async function () {
    // const responseService = { status: 'SUCCESSFUL', data: productFindByIdDb };
    sinon.stub(connection, 'execute').resolves([[undefined]]);
    sinon.stub(productsModel, 'findById').resolves(undefined);
    // sinon.stub(productService, 'getProductsById').resolves(responseService);

    const response = await chai.request(app).get('/products/5');
    
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});