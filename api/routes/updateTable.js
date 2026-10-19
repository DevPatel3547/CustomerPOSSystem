const express = require('express');
const { sequelize, ident, lowerKeys } = require('../db');
const handle = require('./handle');

const router = express.Router();

/*
Body (example):
{
  table: 'menu',
  flavor: 'Mango Pearl',          // columns to set
  price: '5.64',
  identify: 'name_of_item',       // which row: identify = identifyKey
  identifyKey: 'Mango LuLu'
}
*/
router.post('/', handle(async (req, res) => {
  const { table, identify, identifyKey, ...values } = req.body;
  await sequelize.getQueryInterface().bulkUpdate(ident(table), lowerKeys(values), { [ident(identify)]: identifyKey });
  res.json({ title: 'POST request successful', data: req.body });
}));

module.exports = router;
