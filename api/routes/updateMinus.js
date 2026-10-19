const express = require('express');
const { sequelize, ident } = require('../db');
const handle = require('./handle');

const router = express.Router();

/*
Subtracts amounts from columns (e.g. inventory used by an order).
Body: { table, col1: amount1, ..., identify: 'name_of_item', identifyKey: 'Mango LuLu' }
*/
router.post('/', handle(async (req, res) => {
  const { table, identify, identifyKey, ...amounts } = req.body;
  const qi = sequelize.getQueryInterface();
  const values = {};
  for (const [col, amount] of Object.entries(amounts)) {
    const n = Number(amount);
    if (!Number.isFinite(n)) {
      const err = new Error(`amount for ${col} is not a number`);
      err.status = 400;
      throw err;
    }
    const c = ident(col);
    values[c] = sequelize.literal(`${qi.quoteIdentifier(c)} - ${sequelize.escape(n)}`);
  }
  await qi.bulkUpdate(ident(table), values, { [ident(identify)]: identifyKey });
  res.json({ title: 'POST request successful', data: req.body });
}));

module.exports = router;
