import express from 'express'
import UsuarioController from './src/app/controllers/UsuarioController.js';
import database from './database.js';

const app = express()

//indicar para o express ler body com json
app.use(express.json())

database.inicializarBancoDeDados()

//  ROTAS
app.get('/usuario/login', UsuarioController.login)
app.post('/usuario/register', UsuarioController.register)
app.get('/usuario/show/:id', UsuarioController.show)

export default app
