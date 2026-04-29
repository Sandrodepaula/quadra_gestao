
const { pool } = require("../config/database");

class reservasRepository {

    async listar (){
        const { rows} = await pool.query("SELECT * FROM reservas");
        return rows;
    };

    async buscar (id) {
        const { rows} = await pool.query("SELECT * FROM reservas WHERE id = $1", [id]);
        return rows[0];
    }


    async criar (dados) {
        const { clienteId, quadraId, data, hora_inicio, hora_fim } = dados;
        const { rows } = await pool.query(
            "INSERT INTO reservas (cliente_id, quadra_id, data, hora_inicio, hora_fim) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [clienteId, quadraId, data, hora_inicio, hora_fim]
        );
        return rows[0];
    }

    async atualizar (id, dados) {
        const { clienteId, quadraId, data, hora_inicio, hora_fim } = dados;
        const { rows } = await pool.query(
            "UPDATE reservas SET cliente_id = $1, quadra_id = $2, data = $3, hora_inicio = $4, hora_fim = $5 WHERE id = $6 RETURNING *",
            [clienteId, quadraId, data, hora_inicio, hora_fim, id]
        );
        return rows[0];
    }

    async deletar (id) {
        await pool.query("DELETE FROM reservas WHERE id = $1", [id]);
    }
};

module.exports = new reservasRepository();