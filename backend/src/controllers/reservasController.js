
const clientesService = require('../services/reservasService');

class reservasController {
    async listar (req, res, next) {
        try {
            const dados = await reservasService.listar();
            res.status(200).json(dados);
        } catch (err) {
            next(err);
        }
    }

    async buscar (req, res, next) {
        try {
            const { id } = req.params;
            const dados = await reservasService.buscar(id);
            res.status(200).json(dados);    
        } catch (err) {
            next(err);
        }
    }

    async criar (req, res, next) {
        try {
            const novo = await reservasService.criar(req.body);
            res.status(201).json(novo);
        } catch (err) {
            next(err);
        }
    }

    async atualizar (req, res, next) {
        try {
            const { id } = req.params;
            const atualizado = await reservasService.atualizar(id, req.body);
            res.status(200).json(atualizado);
        } catch (err) {
            next(err);
        }
    }

    async deletar (req, res, next) {
        try {
            const { id } = req.params;
            await reservasService.deletar(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    async confirmar (req, res, next) {
        try {
            const { id } = req.params;
            const confirmado = await reservasService.confirmar(id);
            res.status(200).json(confirmado);
        } catch (err) {
            next(err);
        }
    }

    async cancelar (req, res, next) {
        try {
            const { id } = req.params;
            const cancelado = await reservasService.cancelar(id);
            res.status(200).json(cancelado);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new reservasController();