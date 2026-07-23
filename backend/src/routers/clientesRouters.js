
const { Router } = require("express");
const router = Router();
const clientesController = require("../controllers/clientesController");

router.get ("/", (req, res, next) => {
    clientesController.listar(req, res, next);
    
});

router.get ("/:id", (req, res, next) => {
    clientesController.buscar(req, res, next);
});

router.post ("/novo", (req, res, next) => {
    clientesController.criar (req, res, next);
    
});

router.put ("/:id", (req, res, next) => {
    clientesController.atualizar(req, res, next);
});

router.get ("/:id/reservas", (req, res, next) => {
    clientesController.listarReservas(req, res, next);
});

router.delete ("/:id", (req, res, next) => {
    clientesController.deletar(req, res, next);
});

module.exports = router;
