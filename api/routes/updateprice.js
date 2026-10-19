const express = require('express');
const { sequelize, ident } = require('../db');
const handle = require('./handle');

const router = express.Router();

router.post('/', handle(async (req, res) => {
  const { table, cost_of_item, identify, identifyKey } = req.body;
  await sequelize.getQueryInterface().bulkUpdate(ident(table), { cost_of_item }, { [ident(identify)]: identifyKey });
  res.json({ title: 'Price update successful' });
}));

module.exports = router;
