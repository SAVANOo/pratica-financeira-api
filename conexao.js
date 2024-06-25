import mysql from 'mysql'
import dotenv from 'dotenv';

dotenv.config()

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
});

conexao.connect();

export default conexao;
