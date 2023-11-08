var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const dotenv = require('dotenv').config();

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
    console.log('\ninsertInto pool successfully shut down');
    process.exit(0);
});

router.post('/', (req, res) => {
    console.log('InsertInto');
    const requestData = req.body;
    console.log(req.body.table);

    let names = Object.getOwnPropertyNames(requestData);
    names.shift();
    names = '(' + names.toString() + ')';
    console.log(names);

    let temp = Object.values(requestData);
    temp.shift();
    let values = temp.map(val => "'" + val + "'");
    values = '(' + values.toString() + ')';
    console.log(values);

    console.log('INSERT INTO ' + req.body.table + ' ' + names + ' VALUES ' + values + ';');

    pool
        .query('INSERT INTO ' + req.body.table + ' ' + names + ' VALUES ' + values + ';')
        .then(res.json({ title: 'POST request successful', data: requestData }));

});

module.exports = router;