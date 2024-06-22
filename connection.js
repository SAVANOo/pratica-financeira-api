import mysql from 'mysql'

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: ''
});

connection.connect();

connection.query('SELECT * FROM praticasfinanceirasdb.usuario where idusuario = 2;', function (err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows);
});

connection.end();
