import conexao from "../../../conexao.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

const quantidadeDeRounds = 10;
const chaveDeAssinatura = process.env.JWT_KEY;

class UsuarioController {

    async login(req, res) {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são necessários." });
        }

        try {
            const sqlQueryParaBuscarUsuario = 'SELECT * FROM `usuarios` WHERE `email` = ?';
            conexao.query(sqlQueryParaBuscarUsuario, [email], async (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Erro interno no servidor.' });
                }

                if (results.length === 0) {
                    return res.status(404).json({ message: 'Usuário não encontrado.' });
                }

                const usuario = results[0];
                const senhaEncriptada = usuario.senha;

                const senhaCorreta = await bcrypt.compare(senha, senhaEncriptada);
                if (!senhaCorreta) {
                    return res.status(401).json({ message: 'Credenciais inválidas.' });
                }

                const token = jwt.sign({ usuarioId: usuario.id, usuarioEmail: usuario.email }, chaveDeAssinatura, { expiresIn: '1h' });
                res.status(200).json({ token });
            });

        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }

    async register(req, res) {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são necessários." })
        }


        const senhaEncriptada = await bcrypt.hash(senha, quantidadeDeRounds)

        const sql = 'INSERT INTO `usuarios` ( `email`, `senha`) VALUES (?, ?)';
        conexao.query(sql, [email, senhaEncriptada], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro interno no servidor.' });
            }
            res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
        });
    }

    show(req, res) {
        const id = req.params.id;
        const sql = 'SELECT * FROM usuarios where id=?'
        conexao.query(sql, id, (error, result) => {
            if (error) {
                console.log(error)
                res.status(404).json({ 'erro': error })
            } else {
                res.status(200).json(result[0])
            }
        })

    }
}

export default new UsuarioController();
