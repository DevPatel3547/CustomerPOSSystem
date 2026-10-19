const express = require('express');
const { sequelize, ident, lowerKeys } = require('../db');
const handle = require('./handle');

const router = express.Router();

// Body: { table: 'tableName', col1: value1, col2: value2, ... }
router.post('/', handle(async (req, res) => {
  const { table, ...row } = req.body;
  await sequelize.getQueryInterface().bulkInsert(ident(table), [lowerKeys(row)]);
  res.json({ title: 'POST request successful', data: req.body });
}));

module.exports = router;
