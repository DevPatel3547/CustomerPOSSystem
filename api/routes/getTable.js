var express = require('express');
const { Pool } = require('pg')
const dotenv = require('dotenv').config();
var router = express.Router();

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: {rejectUnauthorized: false}
});

process.on('SIGINT', function() {
  pool.end();
  console.log('\ngetTable pool successfully shut down');
  process.exit(0);
});

router.get('/:tableName', function(req, res, next) {
    console.log(req.params.tableName);
    output = []
    pool
        .query('SELECT * FROM ' + req.params.tableName + ';')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                output.push(query_res.rows[i]);
            }
            // console.log(output);
            res.send(output);
        });
});

module.exports = router;