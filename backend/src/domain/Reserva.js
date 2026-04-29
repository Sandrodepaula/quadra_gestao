
class Reserva {
    constructor({id, cliente, quadra, data, horaInicio, horaFim, status, valor, observacoes}) {
        this.id = id;
        this.cliente = cliente;
        this.quadra = quadra;
        this.data = data;
        this.horaInicio = horaInicio;
        this.horaFim = horaFim;
        this.status = status;
        this.valor = valor;
        this.observacoes = observacoes;
    }

    calcularValor(){
        const inicio = new Date(`1970-01-01T${this.horaInicio}`);
        const fim = new Date(`1970-01-01T${this.horaFim}`);
        const horas = (fim - inicio) / (1000 * 60 * 60);
        return horas * this.quadra.precoHora;
    }
}

module.exports = Reserva;