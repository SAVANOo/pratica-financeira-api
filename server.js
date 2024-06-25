import app from "./app.js"
import database from "./database.js"
import conexao from "./conexao.js";

app.post('/usuarios', (req,res) => {

    const { login, senha } = req.body;
    if (!login || !senha) {
        return res.status(400).json({message: "Login e senha são necessários."})
    }

    const novoUsuario = { login, senha };
    const sql = 'INSERT INTO usuarios SET ?';

    conexao.query('USE praticasfinanceirasdb', (err) => {
      if (err) {
        console.error('Erro ao selecionar o banco de dados:', err);
        return;
      }
      console.log('Banco de dados selecionado com sucesso.');
    });

    conexao.query(sql, novoUsuario, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro interno no servidor.' });
      }
      console.log('Usuário adicionado:', { id: result.insertId, ...novoUsuario });
      res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
      });

});
            
const PORT = 3001

app.listen(PORT, () => {
    console.log(`Servidor rodando aqui localhost:${PORT}`)
})
