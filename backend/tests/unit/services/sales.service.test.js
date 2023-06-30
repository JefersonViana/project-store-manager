const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const {
  salesFromDb,
  salesFindByIdDb,
  responseServiceAll,
  responseServiceById,
  inputDataService,
  responseDataService,
} = require('../mock/sales.mock');
const { salesModel } = require('../../../src/models');

describe('Realizando testes - SALES SERVICE:', function () {
  it('Recupereando todas as vendas de service.', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesFromDb);
    const responseService = await salesService.getAllSales();
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.have.lengthOf(3);
    expect(responseService).to.be.deep.equal(responseServiceAll);
  });

  it('Recupereando uma venda de service pelo /:id.', async function () {
    sinon.stub(salesModel, 'findById').resolves(salesFindByIdDb);
    const responseFromService = await salesService.getSalesById(1);
    
    expect(responseFromService).to.be.an('object');
    expect(responseFromService.data).to.have.lengthOf(2);
    expect(responseFromService).to.be.deep.equal(responseServiceById);
  });

  it('Testa o retornando passando um id inexistente.', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const responseFromService = await salesService.getSalesById(10);
    
    expect(responseFromService.status).to.be.equal('NOT_FOUND');
    expect(responseFromService.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  // it('Testa se as vendas foram adicionados com sucesso!', async function () {
  //   sinon.stub(salesModel, 'insertSales').resolves(3);
  //   const responseFromService = await salesService.insertSales(inputDataService);
    
  //   expect(responseFromService.status).to.be.equal('CREATED');
  //   expect(responseFromService.data.itemsSold).to.have.lengthOf(2);
  //   expect(responseFromService).to.be.deep.equal(responseDataService);
  // });

  afterEach(function () {
    sinon.restore();
  });
});