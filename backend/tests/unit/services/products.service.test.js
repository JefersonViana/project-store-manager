const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const schema = require('../../../src/services/validations/validationsInputValues');
const {
  responseServiceAll,
  productsFromDb,
  productByIdDb,
  productByIdModel,
  responseServiceById,
  responseServiceNotFound,
} = require('../mock/products.mock');
const { productsModel } = require('../../../src/models');

describe('Realizando testes - PRODUCTS SERVICE:', function () {
  it('Recupereando todos os produtos de service.', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromDb);
    const responseService = await productService.getAllProducts();
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.have.lengthOf(3);
    expect(responseService).to.be.deep.equal(responseServiceAll);
  });

  it('Recupereando uma venda de service pelo /:id.', async function () {
    sinon.stub(productsModel, 'findById').resolves(productByIdDb);
    const responseFromService = await productService.getProductsById(1);
    
    expect(responseFromService).to.be.an('object');
    expect(responseFromService.status).to.be.equal('SUCCESSFUL');
    expect(responseFromService.data).to.be.deep.equal(productByIdModel);
    expect(responseFromService).to.be.deep.equal(responseServiceById);
  });

  it('Testa o retornando passando um id inexistente.', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const responseFromService = await productService.getProductsById(10);
    
    expect(responseFromService.status).to.be.equal('NOT_FOUND');
    expect(responseFromService.data).to.be.deep.equal({ message: 'Product not found' });
    expect(responseFromService).to.be.deep.equal(responseServiceNotFound);
  });

  it('Testa se é adicionado um produto com sucesso!', async function () {
    sinon.stub(schema, 'validateProductCreation').returns(undefined);
    sinon.stub(productsModel, 'insert').resolves(3);
    const responseFromService = await productService.insertProduct({ name: 'Robô' });
    
    expect(responseFromService.status).to.be.equal('CREATED');
    expect(responseFromService.data).to.be.deep.equal({ id: 3, name: 'Robô' });
  });

  it('Testa se é retornado um INVALID_VALUE caso não passe uma string para a propriedade "name".', async function () {
    sinon.stub(schema, 'validateProductCreation').returns({ status: 'INVALID_VALUE', message: '"name" must be a string' });
    const responseFromService = await productService.insertProduct({ name: 10 });
    
    expect(responseFromService.status).to.be.equal('INVALID_VALUE');
    expect(responseFromService.data).to.be.deep.equal({ message: '"name" must be a string' });
  });

  it('Testa se é retornado um INVALID_VALUE caso seja passado uma string com menos de 5 caractaer .', async function () {
    sinon.stub(schema, 'validateProductCreation').returns({ status: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
    const responseFromService = await productService.insertProduct({ name: 'prod' });
    
    expect(responseFromService.status).to.be.equal('INVALID_VALUE');
    expect(responseFromService.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('Testa se é possivel atualizar um produto em service.', async function () {
    sinon.stub(schema, 'validateProductCreation').returns(undefined);
    sinon.stub(productsModel, 'findById').resolves({ name: 'Quebra cabeça', id: 1 });
    sinon.stub(productsModel, 'updateById').resolves({ name: 'Quebra cabeça', id: 1 });
    const responseFromService = await productService.updateProduct({ name: 'Martelo de Thor', id: 1 });
    
    expect(responseFromService.status).to.be.equal('SUCCESSFUL');
    expect(responseFromService.data).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
  });

  it('Testa se é impossivel atualizar um produto em service caso ele não exista.', async function () {
    sinon.stub(schema, 'validateProductCreation').returns(undefined);
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const responseFromService = await productService.updateProduct({ name: 'Machado de Thor', id: 10 });
    
    expect(responseFromService.status).to.be.equal('NOT_FOUND');
    expect(responseFromService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Testa se é impossivel atualizar um produto em service caso não seja passado a propriedade name com pelo menos 5 caracter.', async function () {
    sinon.stub(schema, 'validateProductCreation').returns({ status: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
    const responseFromService = await productService.updateProduct({ name: 'Thor', id: 10 });
    
    expect(responseFromService.status).to.be.equal('INVALID_VALUE');
    expect(responseFromService.data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('Testa se é possivel deletar um produto em service.', async function () {
    sinon.stub(productsModel, 'findById').resolves({ name: 'Quebra cabeça', id: 1 });
    sinon.stub(productsModel, 'deleteById').resolves({ name: 'Quebra cabeça', id: 1 });
    const responseFromService = await productService.deleteProduct(1);
    
    expect(responseFromService.status).to.be.equal('DELETED');
    expect(responseFromService).to.be.deep.equal({ status: 'DELETED' });
  });

  it('Testa se é impossivel deletar um produto em service caso ele não exista.', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const responseFromService = await productService.deleteProduct(1);
    
    expect(responseFromService.status).to.be.equal('NOT_FOUND');
    expect(responseFromService.data).to.be.deep.equal({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});