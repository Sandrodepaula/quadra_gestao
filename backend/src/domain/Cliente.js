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
