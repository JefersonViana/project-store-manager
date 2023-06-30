const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const schema = require('../../../src/services/validations/validationsInputValues');
const {
  salesFromDb,
  salesFindByIdDb,
  responseServiceAll,
  responseServiceById,
  inputDataService,
  responseDataService,
  inputDataServiceFail,
} = require('../mock/sales.mock');
const { salesModel, productsModel } = require('../../../src/models');

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

  it('Testa se as vendas não podem serem adicionadas caso alguma venda tenha um produto com id abaixo de 1', async function () {
    sinon.stub(schema, 'validateSalesCreation').returns({ status: 'INVALID_VALUE', message: '"productId" must be greater than or equal to 1' });
    const responseFromService = await salesService.insertSales(inputDataServiceFail);
    
    expect(responseFromService.status).to.be.equal('INVALID_VALUE');
    expect(responseFromService.data).to.be.deep.equal({ message: '"productId" must be greater than or equal to 1' });
  });

  it('Testa se as vendas não podem serem adicionadas caso algum produto não exista', async function () {
    sinon.stub(schema, 'validateSalesCreation').returns(false);
    sinon.stub(productsModel, 'findById').resolves(true);
    const responseFromService = await salesService.insertSales(inputDataService);
    
    expect(responseFromService.status).to.be.equal('NOT_FOUND');
    expect(responseFromService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Testa se as vendas foram adicionados com sucesso!', async function () {
    sinon.stub(schema, 'validateSalesCreation').returns(false);
    sinon.stub(productsModel, 'findById').resolves({});
    sinon.stub(salesModel, 'insertSales').resolves(3);
    sinon.stub(salesModel, 'insertSalesProduct').resolves(true);
    const responseFromService = await salesService.insertSales(inputDataService);
    
    expect(responseFromService.status).to.be.equal('CREATED');
    expect(responseFromService.data.itemsSold).to.have.lengthOf(2);
    expect(responseFromService).to.be.deep.equal(responseDataService);
  });

  afterEach(function () {
    sinon.restore();
  });
});