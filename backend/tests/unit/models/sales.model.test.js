const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  salesFromDb,
  salesFromModel,
  salesFindByIdDb,
  salesFindByIdModel,
  addSalesInModel,
  inputData,
  addSalesInDb,
  responseServiceAll,
} = require('../mock/sales.mock');

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
  
  it('Testa se é possivel cadastrar uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const responseFromDb = await salesModel.insertSales();
    const inputModel = 4;
    expect(responseFromDb).to.be.equal(inputModel);
  });
  
  it('Testa se é adicionar uma venda.', async function () {
    sinon.stub(connection, 'execute').resolves(addSalesInDb);
    const responseFromDb = await salesModel.insertSalesProduct(inputData);
    
    expect(responseFromDb[0]).to.be.deep.equal(addSalesInModel[0]);
    expect(responseFromDb[1]).to.be.equal(undefined);
  });
  
  it('Testa se ao chama a  função passando o saleId e productId retorna uma venda cadastrada.', async function () {
    sinon.stub(connection, 'execute').resolves([[responseServiceAll.data[1]]]);
    const responseFromDb = await salesModel.findSaleByIdWithProductId({ saleId: 1, productId: 2 });
    
    expect(responseFromDb).to.be.deep.equal(responseServiceAll.data[1]);
    expect(responseFromDb).to.be.an('object');
  });
  
  it('Testa se existe uma venda com o id corretamente.', async function () {
    sinon.stub(connection, 'execute').resolves([[{ id: 2, date: '2023-06-29T00:18:04.000Z' }]]);
    const responseFromDb = await salesModel.saleFindById(2);
    
    expect(responseFromDb).to.be.deep.equal({ id: 2, date: '2023-06-29T00:18:04.000Z' });
    expect(responseFromDb).to.be.an('object');
  });
  
  it('Testa se foi cadastrado uma venda com sucesso.', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const responseFromDb = await salesModel.updateQuantitySale(2);
    
    expect(responseFromDb).to.be.equal(1);
    expect(responseFromDb).to.be.an('number');
  });
  
  it('Testa se é possível deletar uma venda com sucesso.', async function () {
    sinon.stub(connection, 'execute').resolves([addSalesInDb]);
    const responseFromDb = await salesModel.deleteById(2);
    
    expect(responseFromDb).to.be.deep.equal([addSalesInModel]);
    expect(responseFromDb).to.be.an('array');
  });

  afterEach(function () {
    sinon.restore();
  });
});