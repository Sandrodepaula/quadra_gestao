
class Pagamento {
    constructor({ id, reserva, valor, metodo, status }) {
        this.id = id;
        this.reserva = reserva;
        this.valor = valor;
        this.metodo = metodo;
        this.status = status;
    }
}

module.exports = Pagamento;