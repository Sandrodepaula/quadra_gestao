const reservasRepository = require("../repositories/reservasRepository");

class reservasService {
    async listar (){
        return await reservasRepository.listar();
    };

    async buscar (id) {
        const reserva = await reservasRepository.buscar(id);
        if (!reserva) {
            throw new Error("Reserva não encontrada");
        };
        return reserva;
    }

    async criar (dados) {
        if (!dados.clienteId || !dados.id || !dados.data || !dados.hora_inicio || !dados.hora_fim) {

            throw new Error("Dados incompletos");
        }

        return await reservasRepository.criar(dados);
    }

    async atualizar (id, dados) {
        await this.buscar(id); // Verifica se a reserva existe antes de atualizar
        return await reservasRepository.atualizar(id, dados);
    }
    
    async deletar (id) {
        await this.buscar(id); // Verifica se a reserva existe antes de deletar
        return await reservasRepository.deletar(id);
    }
}

module.exports = new reservasService();