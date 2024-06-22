import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: ''
});

conexao.connect();

export default conexao;
