const { addProductSchema } = require('./schemas');

const validateProductCreation = (keysObjectToValidate) => {
  const { error } = addProductSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateProductCreation,
};
