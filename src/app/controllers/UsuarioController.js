import conexao from "../../../conexao.js";
import bcrypt from "bcrypt";

const quantidadeDeRounds = 10;

class UsuarioController {

    senhaEncriptada

    async login(req, res) {
        const resultadoDaComparacao = bcrypt.compare(senhaDoParametro, senhaEncriptada)
    }

    async register(req, res) {
        /*!!!!!! Definir a senha do parâmetro (usuário) ao fazer o login */
        let senhaDoParametro = 'senhateste'
        let senhaEncriptada

        senhaEncriptada = await bcrypt.hash(senhaDoParametro, 10)
        console.log("Esta é a senha encriptada que deve ser salva no banco quando fizer o registro:", senhaEncriptada)

        let senhaParaComparar = "senhateste"
        const resultadoDaComparacao = await bcrypt.compare(senhaParaComparar, senhaEncriptada);

        console.log("Resultado da comparação com a senha que irá vir da requisição e será comparada com a senha do banco encriptada:")

        if (resultadoDaComparacao) {
            console.log("A senha bate")
        } else {
            console.log("A senha não bate")
        }
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
