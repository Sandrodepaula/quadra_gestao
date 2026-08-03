export interface Cliente {
    id: number;
    nome: string;
    telefone: string;
    email: string;
}

export interface Reserva {
    id: number;
    hora: string;
    quadra: string;
    cliente: string;
    esporte: string;
    status: string;
}
