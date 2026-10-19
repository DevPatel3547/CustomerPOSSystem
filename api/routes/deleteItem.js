const express = require('express');
const { sequelize, ident } = require('../db');
const handle = require('./handle');

const router = express.Router();

// Body: { table, identify: 'column', identifyKey: 'value' }
router.post('/', handle(async (req, res) => {
  const { table, identify, identifyKey } = req.body;
  await sequelize.getQueryInterface().bulkDelete(ident(table), { [ident(identify)]: identifyKey });
  res.json({ title: 'POST request successful' });
}));

module.exports = router;
