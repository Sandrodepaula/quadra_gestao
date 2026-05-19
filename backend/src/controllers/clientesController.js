
const clientesService = require('../services/clientesService');

class clientesController {
    async listar (req, res, next) {
        try {
            const dados = await clientesService.listar();
            res.status(200).json(dados);
        } catch (err) {
            next(err);
        }
    }

    async buscar (req, res, next) {
        try {
            const { id } = req.params;// Extrai o ID dos parâmetros da URL
            const dados = await clientesService.buscar(id);
            res.status(200).json(dados);    
        } catch (err) {
            next(err);
        }
    }

    async criar (req, res, next) {
        try {
            const novo = await clientesService.criar(req.body);
            res.status(201).json(novo);
        } catch (err) {
            next(err);
        }
    }

    async atualizar (req, res, next) {
        try {
            const { id } = req.params;
            const atualizado = await clientesService.atualizar(id, req.body);
            res.status(200).json(atualizado);
        } catch (err) {
            next(err);
        }
    }

    async listarReservas (req, res, next) {
        try {
            const { id } = req.params;
            const reservas = await clientesService.listarReservas(id);
            res.status(200).json(reservas);
        } catch (err) {
            next(err);
        }
    }

    async deletar (req, res, next) {
        try {
            const { id } = req.params;
            await clientesService.deletar(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new clientesController();