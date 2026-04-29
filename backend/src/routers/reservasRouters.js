
const { Router } = require("express");
const router = Router();
const clientesController = require("../controllers/reservasController");

router.get ("/", (req, res, next) => {
    reservasController.listar(req, res, next);
});

router.get ("/:id", (req, res, next) => {
    reservasController.buscar(req, res, next);
});

router.post ("/", (req, res, next) => {
    reservasController.criar (req, res, next);
});

router.put ("/:id", (req, res, next) => {
    reservasController.atualizar(req, res, next);
});

router.delete ("/:id", (req, res, next) => {
    reservasController.deletar(req, res, next);
});

router.post('/:id/confirmar', (req, res, next) => {
    reservasController.confirmar(req, res, next);
});

router.post('/:id/cancelar', (req, res, next) => {
    reservasController.cancelar(req, res, next);
});

module.exports = router;