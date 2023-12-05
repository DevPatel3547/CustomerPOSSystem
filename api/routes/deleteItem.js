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
    console.log('\ndeleteItem pool successfully shut down');
    process.exit(0);
});

/*
How to give data (example):

const data = {

    //always have table be the first attribute
    table: 'tableName',

    //these are the values you are changing into the table
    flavor: 'Mango Pearl',
    price: '5.64',
    ...

    //always have identify and then identifyKey be the last two attributes
    //these are used to tell how to know what item to change
    //Example: if you want to change the drink named Mango LuLu
    identify: 'name_of_item'
    identifyKey: 'Mango LuLu'

    //I recommend using the values you got from the table to populate this data
    //because things like spelling or capitalization will mess it up

}
*/

router.post('/', (req, res) => {
    console.log('deleteItem');
    console.log('Table: ' + req.body.table);
    console.log('Identifier: ' + req.body.identify);
    console.log('Identify Key: ' + req.body.identifyKey);

    let query = 'DELETE FROM ' + req.body.table + ' WHERE ' + req.body.identify + ` = '` + req.body.identifyKey + `';`;
    console.log(query);
    
    // res.send(query);

    pool
        .query(query)
        .then(res.json({ title: 'POST request successful', query: query }));

});

module.exports = router;