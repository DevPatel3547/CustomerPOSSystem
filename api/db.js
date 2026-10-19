// db.js
// One shared Sequelize (ORM) connection to PostgreSQL for every route, instead of a
// raw pg Pool per route file. Routes go through Sequelize's query interface, which
// quotes identifiers and binds values, so request data is never concatenated into SQL.
require('dotenv').config();
const { Sequelize } = require('sequelize');

const useSsl = (process.env.PSQL_SSL || 'true').toLowerCase() !== 'false';

const sequelize = new Sequelize(
  process.env.PSQL_DATABASE,
  process.env.PSQL_USER,
  process.env.PSQL_PASSWORD,
  {
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT ? Number(process.env.PSQL_PORT) : 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: useSsl ? { ssl: { require: true, rejectUnauthorized: false } } : {},
  },
);

// Table and column names come from the client, so only plain SQL identifiers are
// accepted. They are lower-cased to keep Postgres' unquoted-name behaviour.
const IDENT = /^[A-Za-z_][A-Za-z0-9_]*$/;
function ident(name) {
  if (typeof name !== 'string' || !IDENT.test(name)) {
    const err = new Error(`invalid identifier: ${JSON.stringify(name)}`);
    err.status = 400;
    throw err;
  }
  return name.toLowerCase();
}

function lowerKeys(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) out[ident(k)] = v;
  return out;
}

module.exports = { sequelize, Sequelize, ident, lowerKeys };
