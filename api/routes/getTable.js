const express = require('express');
const { sequelize, ident } = require('../db');
const handle = require('./handle');

const router = express.Router();

router.get('/:tableName', handle(async (req, res) => {
  const rows = await sequelize.getQueryInterface().select(null, ident(req.params.tableName), { raw: true });
  res.json(rows);
}));

module.exports = router;
