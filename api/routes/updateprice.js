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
    console.log('\nupdateTable pool successfully shut down');
    process.exit(0);
});

router.post('/', (req, res) => {
    console.log('updatePrice');
    const { table, cost_of_item, identify, identifyKey } = req.body;

    let query = `UPDATE ${table} SET cost_of_item = '${cost_of_item}' WHERE ${identify} = '${identifyKey}';`;
    console.log(query);
    
    pool.query(query)
        .then(() => res.json({ title: 'Price update successful' }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ title: 'Error updating price' });
        });
});

module.exports = router;