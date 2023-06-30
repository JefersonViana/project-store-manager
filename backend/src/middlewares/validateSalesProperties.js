const checkRequiredField = require('../utils/checkRequiredField');

const validateSalesProperties = (req, res, next) => {
  const { body } = req;
  const requiredProductField = ['productId', 'quantity'];
  for (let i = 0; i < body.length; i += 1) {
    const productError = checkRequiredField(body[i], requiredProductField);
    if (productError) return res.status(400).json({ message: productError });
  }
  next();
};

module.exports = validateSalesProperties;