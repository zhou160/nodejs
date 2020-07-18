const mysql = require('mysql');
let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nz-204'
});

module.exports = pool;