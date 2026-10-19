const express = require('express');
const { sequelize } = require('../db');
const handle = require('./handle');

const router = express.Router();

router.get('/', handle(async (req, res) => {
  const teammembers = await sequelize.getQueryInterface().select(null, 'teammembers', { raw: true });
  res.send(teammembers);
}));

module.exports = router;
