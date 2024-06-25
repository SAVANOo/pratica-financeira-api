import conexao from './conexao.js';
import dotenv from 'dotenv';

dotenv.config()
class Database {
    constructor(conexao) {
        this.conexao = conexao;
        this.databaseName = process.env.DB_DATABASE;
    }

    async verificarBancoDeDados() {
        const checkDatabaseQuery = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${this.databaseName}'`;
        return new Promise((resolve, reject) => {
            this.conexao.query(checkDatabaseQuery, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.length > 0);
                }
            });
        });
    }

    async criarBancoDeDados() {
        const createDatabaseQuery = `CREATE SCHEMA \`${this.databaseName}\` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;`;
        return new Promise((resolve, reject) => {
            this.conexao.query(createDatabaseQuery, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async criarTabelaUsuario() {
        const createTableUsuario = 'CREATE TABLE praticasfinanceirasdb.usuarios (id INT NOT NULL AUTO_INCREMENT, login VARCHAR(45) NULL, senha VARCHAR(45) NULL, PRIMARY KEY(id));'
        return new Promise((resolve, reject) => {
            this.conexao.query(createTableUsuario, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async inicializarBancoDeDados() {
        try {
            const bancoExiste = await this.verificarBancoDeDados();
            if (bancoExiste) {
                console.log('Banco de dados já existe.');
                return;
            }

            await this.criarBancoDeDados();
            console.log('Banco de dados criado com sucesso!');

            await this.criarTabelaUsuario();
            console.log('Tabela de usuários criada com sucesso!');
        } catch (err) {
            console.error('Erro ao inicializar o banco de dados:', err);
        }
    }
}

const database = new Database(conexao);
export default database;
