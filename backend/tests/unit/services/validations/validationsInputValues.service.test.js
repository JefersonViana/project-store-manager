const chai = require('chai');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');

const { expect } = chai;
// chai.use(sinonChai);

// const { addProductSchema } = require('../../../../src/services/validations/schemas');
const { validateProductCreation, validateSalesCreation } = require('../../../../src/services/validations/validationsInputValues');

describe('Testa diretorio validations', function () {
  it('Testa função validateProductCreation', function () {
    const response = validateProductCreation({ name: 'prod' });
    
    expect(response.status).to.be.equal('INVALID_VALUE');
    expect(response.message).to.be.equal('"name" length must be at least 5 characters long');
  });

  it('Testa função validateProductCreation com caso de sucesso!', function () {
    const response = validateProductCreation({ name: 'produto novo' });
    
    expect(response).to.be.equal(undefined);
  });

  it('Testa função validateSalesCreation', function () {
    const response = validateSalesCreation([
      { productId: 0, quantity: 1 },
      { productId: 2, quantity: 5 },
    ]);
    
    expect(response.status).to.be.equal('INVALID_VALUE');
    expect(response.message).to.be.equal('"productId" must be greater than or equal to 1');
  });

  it('Testa função validateSalesCreation com caso de sucesso!', function () {
    const response = validateSalesCreation([
      { productId: 3, quantity: 1 },
      { productId: 2, quantity: 5 },
    ]);
    
    expect(response).to.be.equal(undefined);
  });
});