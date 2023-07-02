const checkRequiredField = (receivedField, requiredField) => {
  for (let i = 0; i < requiredField.length; i += 1) {
    const currentField = requiredField[i];
    if (!(currentField in receivedField)) {
      return `"${currentField}" is required`;
    }
  }
};

module.exports = { checkRequiredField };
