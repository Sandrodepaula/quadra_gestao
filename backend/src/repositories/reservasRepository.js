
const { pool } = require("../config/database");

class reservasRepository {

    async listar() {
        const { rows } = await pool.query(
            `SELECT * FROM reservas ORDER BY data ASC, hora_inicio ASC`
        );
        return rows;
    }

    async buscar (id) {
        const { rows} = await pool.query("SELECT * FROM reservas WHERE id = $1", [id]);
        return rows[0];
    }


    async criar (dados) {
        const { id, clienteId, data, hora_inicio, hora_fim } = dados;
        const { rows } = await pool.query(
            "INSERT INTO reservas (id, cliente_id, data, hora_inicio, hora_fim) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [id, clienteId, data, hora_inicio, hora_fim]
        );
        return rows[0];
    }

    async atualizar ( dados) {
        const { id, clienteId, data, hora_inicio, hora_fim } = dados;
        const { rows } = await pool.query(
            "UPDATE reservas SET id = $1, cliente_id = $2, data = $3, hora_inicio = $4, hora_fim = $5 WHERE id = $6 RETURNING *",
            [id, clienteId, data, hora_inicio, hora_fim]
        );
        return rows[0];
    }

    async deletar (id) {
        await pool.query("DELETE FROM reservas WHERE id = $1", [id]);
    }
};

module.exports = new reservasRepository();