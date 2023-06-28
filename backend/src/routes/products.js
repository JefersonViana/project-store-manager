const express = require('express');

const route = express();

route.get('/', (_req, res) => {
  res.status(200).json({ message: 'Route from products' });
});

module.exports = route;
