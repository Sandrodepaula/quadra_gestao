
const { pool } = require("../config/database");

class clientesRepository {

    async listar (){
        const { rows} = await pool.query("SELECT * FROM clientes");
        return rows;
    };

    async buscar (id) {
        const { rows} = await pool.query("SELECT * FROM clientes WHERE id = $1", [id]);
        return rows[0];
    }


    async criar (dados) {
        const { nome, email, telefone} = dados;
        const { rows } = await pool.query(
            "INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *",
            [nome, email, telefone]
        );
        return rows[0];
    }

    async atualizar (id, dados) {
        const { nome, email, telefone} = dados;
        const { rows } = await pool.query(
            "UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *",
            [nome, email, telefone, id]
        );
        return rows[0];
    }

    async deletar (id) {
        await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
    }
};

module.exports = new clientesRepository();