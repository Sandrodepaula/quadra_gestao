
const { pool } = require("../config/database");

class reservasRepository {

    async listar() {
        const { rows } = await pool.query(
            `SELECT * FROM reservas ORDER BY data ASC, hora_inicio ASC` //Mostra as reservas ordenadas por data e hora de início, do mais antigo para o mais recente
        );
        return rows;
    }

    async buscar (id) {
        const { rows} = await pool.query("SELECT * FROM reservas WHERE id = $1", [id]);
        return rows[0];
    }


    async criar (dados) {
        const { clienteId, data, hora_inicio, hora_fim, valor } = dados;
        const { rows } = await pool.query(
            "INSERT INTO reservas (cliente_id, data, hora_inicio, hora_fim, valor) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [clienteId, data, hora_inicio, hora_fim, valor]
        );
        return rows[0];
    }

    async atualizar ( id, dados) {
        const { clienteId, data, hora_inicio, hora_fim, valor } = dados;
        const { rows } = await pool.query(
            `UPDATE reservas 
            SET cliente_id = $1,
                data = $2, 
                hora_inicio = $3, 
                hora_fim = $4,
                valor = $5                
                WHERE id = $6 
                RETURNING *`,
            [clienteId, data, hora_inicio, hora_fim, valor, id]
        );
        return rows[0];
    }

    async deletar (id) {
        await pool.query("DELETE FROM reservas WHERE id = $1", [id]);
    }
};

module.exports = new reservasRepository();