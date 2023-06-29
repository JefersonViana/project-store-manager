const checkRequiredField = require('../utils/checkRequiredField');

const validateProductName = (req, res, next) => {
  const { body } = req;
  const requiredProductField = ['name'];
  const productError = checkRequiredField(body, requiredProductField);
  if (productError) return res.status(400).json({ message: productError });
  next();
};

module.exports = validateProductName;
