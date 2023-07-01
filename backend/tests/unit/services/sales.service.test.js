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
  updateQuantityService,
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

  it('Testa se é impossível atualizar a quantidade de um produto caso a nova quantidade seja menor que 1', async function () {
    sinon.stub(schema, 'validateSalesCreation').returns(false);
    const responseFromService = await salesService.updateQuantitySales({ saleId: 1, productId: 7, quantity: 0 });
    
    expect(responseFromService.status).to.be.equal('INVALID_VALUE');
    expect(responseFromService.data).to.be.an('object');
    expect(responseFromService.data).to.be.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Testa se é impossível atualizar a quantidade de um produto caso ele não exista', async function () {
    sinon.stub(schema, 'validateSalesCreation').returns(false);
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const responseFromService = await salesService.updateQuantitySales({ saleId: 1, productId: 7, quantity: 75 });
    
    expect(responseFromService.status).to.be.equal('NOT_FOUND');
    expect(responseFromService.data).to.be.an('object');
    expect(responseFromService.data).to.be.deep.equal({ message: 'Product not found in sale' });
  });

  it('Testa se é impossível atualizar a quantidade de um produto caso a venda não exista', async function () {
    sinon.stub(schema, 'validateSalesCreation').returns(false);
    sinon.stub(productsModel, 'findById').resolves({});
    sinon.stub(salesModel, 'updateQuantitySale').resolves(0);
    const responseFromService = await salesService.updateQuantitySales({ saleId: 18, productId: 2, quantity: 75 });
    
    expect(responseFromService.status).to.be.equal('NOT_FOUND');
    expect(responseFromService.data).to.be.an('object');
    expect(responseFromService.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('Testa se é possível atualizar a quantidade de um produto vendido', async function () {
    sinon.stub(schema, 'validateSalesCreation').returns(false);
    sinon.stub(productsModel, 'findById').resolves({});
    sinon.stub(salesModel, 'updateQuantitySale').resolves(1);
    sinon.stub(salesModel, 'findSaleByIdWithProductId').resolves(updateQuantityService);
    const responseFromService = await salesService.updateQuantitySales({ saleId: 1, productId: 2, quantity: 75 });
    const data = {
      saleId: 1,
      productId: 2,
      quantity: 75,
      date: '2023-07-01T17:35:31.000Z',
    };
    expect(responseFromService.status).to.be.equal('SUCCESSFUL');
    expect(responseFromService.data).to.be.an('object');
    expect(responseFromService.data).to.be.deep.equal(data);
  });

  it('Testa se é possível deletar uma venda.', async function () {
    sinon.stub(salesModel, 'saleFindById').resolves({});
    sinon.stub(salesModel, 'deleteById').resolves();
    const responseFromService = await salesService.deleteSales(1);
    
    expect(responseFromService.status).to.be.equal('DELETED');
    expect(responseFromService).to.be.an('object');
  });

  it('Testa se é impossível deletar uma venda caso a venda não exista.', async function () {
    sinon.stub(salesModel, 'saleFindById').resolves(undefined);
    const responseFromService = await salesService.deleteSales(15);
    
    expect(responseFromService.status).to.be.equal('NOT_FOUND');
    expect(responseFromService).to.be.an('object');
    expect(responseFromService.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});