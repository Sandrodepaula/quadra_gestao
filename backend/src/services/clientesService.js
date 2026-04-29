const clientesRepository = require("../repositories/clientesRepository");

class clientesService {
    async listar (){
        return await clientesRepository.listar();
    };

    async buscar (id) {
        const cliente = await clientesRepository.buscar(id);
        if (!cliente) {
            throw new Error("Cliente não encontrado");
        };
        return cliente;
    }

    async criar (dados) {
        if (!dados.nome || !dados.email || !dados.telefone) {
            throw new Error("Dados incompletos");
        }

        return await clientesRepository.criar(dados);
    }

    async atualizar (id, dados) {
        await this.buscar(id); // Verifica se o cliente existe antes de atualizar
        return await clientesRepository.atualizar(id, dados);
    }
    
    async listarReservas (id) {
        await this.buscar(id); // Verifica se o cliente existe antes de listar as reservas
        return await clientesRepository.listarReservas(id);
    }   
    
    async deletar (id) {
        await this.buscar(id); // Verifica se o cliente existe antes de deletar
        return await clientesRepository.deletar(id);
    }
}

module.exports = new clientesService();