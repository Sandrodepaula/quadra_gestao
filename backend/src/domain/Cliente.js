// Aqui definimos a classe Cliente, que representa um cliente do sistema de gestão de quadras esportivas. Ela possui propriedades como id, nome, telefone, email e observações. Essa classe pode ser utilizada para criar objetos de cliente e facilitar a manipulação dos dados relacionados aos clientes no sistema.

class Cliente {
    constructor({ id, nome, telefone, email, observacoes }) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.observacoes = observacoes;
    }
}

module.exports = Cliente;
