const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productsFromDb, productsFromModel } = require('../mock/products.mock');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Recupereando todos os produtos do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDb]);
    const responseFromDb = await productsModel.findAll();

    expect(responseFromDb).to.be.an('array');
    expect(responseFromDb).to.have.lengthOf(3);
    expect(responseFromDb).to.be.deep.equal(productsFromModel);
  });

  it('Recupereando um produto do banco de dados pelo /:id', async function () {
    sinon.stub(connection, 'execute').resolves([[productsFromDb[0]]]);
    const responseFromDb = await productsModel.findById(1);
    
    expect(responseFromDb).to.be.an('object');
    expect(responseFromDb).to.be.deep.equal(productsFromModel[0]);
  });

  it('Testa se retorna false caso id não seja passado', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const responseFromDb = await productsModel.findById();
    
    expect(responseFromDb).to.be.equal(undefined);
  });

  it('Testa se é possivel adicionar um produto com sucesso!', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const responseFromDb = await productsModel.insert('Robô');
    
    expect(responseFromDb).to.be.equal(3);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});