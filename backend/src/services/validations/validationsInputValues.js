const { addProductSchema, addSalesSchema } = require('./schemas');

const validateProductCreation = (keysObjectToValidate) => {
  const { error } = addProductSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateSalesCreation = (arraySalesToValidare) => {
  const { error } = addSalesSchema.validate(arraySalesToValidare);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateProductCreation,
  validateSalesCreation,
};
