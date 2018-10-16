const mysql = require('mysql');

// gerenciado as conections com o banco
const connection = mysql.createPool({
    host:       'localhost',
    user:       'root',
    password:   'l123',
    database:   'db_portifolio'
});

module.exports = connection;
