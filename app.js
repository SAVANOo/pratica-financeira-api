import express from 'express'
import UsuarioController from './src/app/controllers/UsuarioController.js';
import database from './database.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express()

//indicar para o express ler body com json
app.use(express.json())

database.inicializarBancoDeDados()

//  ROTAS
app.post('/usuario/login', UsuarioController.login)
app.post('/usuario/register', UsuarioController.register)
app.get('/user/:id', authMiddleware, UsuarioController.show);

export default app
