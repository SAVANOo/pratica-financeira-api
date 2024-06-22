import conexao from "../../../conexao.js";

class UsuarioController {
    login(req, res) {

    }

    register(req, res) {

    }

    show(req, res) {
        const id = req.params.id;
        const sql = 'SELECT * FROM praticasfinanceirasdb.usuarios where id=?'
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
