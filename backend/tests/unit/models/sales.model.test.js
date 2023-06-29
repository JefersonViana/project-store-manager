const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesFromDb, salesFromModel, salesFindByIdDb, salesFindByIdModel } = require('../mock/sales.mock');

describe('Realizando testes - SALES MODEL:', function () {
  it('Recupereando todas as vendas do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDb]);
    const responseFromDb = await salesModel.findAll();

    expect(responseFromDb).to.be.an('array');
    expect(responseFromDb).to.have.lengthOf(3);
    expect(responseFromDb).to.be.deep.equal(salesFromModel);
  });

  it('Recupereando uma venda do banco de dados pelo /:id', async function () {
    sinon.stub(connection, 'execute').resolves([salesFindByIdDb]);
    const responseFromDb = await salesModel.findById(1);
    
    expect(responseFromDb).to.be.an('array');
    expect(responseFromDb).to.have.lengthOf(2);
    expect(responseFromDb).to.be.deep.equal(salesFindByIdModel);
  });

  it('Testa se retorna um array vazio caso id não seja passado', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const responseFromDb = await salesModel.findById();
    
    expect(responseFromDb).to.have.lengthOf(0);
    expect(responseFromDb).to.be.deep.equal([]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});