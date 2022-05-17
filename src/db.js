const {Pool} = require('pg');


const pool = new Pool({

    user: 'postgres',
    password: '32221100',
    host: 'localhost',
    port: '5432',
    database: 'axon'    

})

module.exports = pool;