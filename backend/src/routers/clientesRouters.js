
const { Router } = require("express");
const router = Router();
const clientesController = require("../controllers/clientesController");

router.get ("/clientes", (req, res, next) => {
    clientesController.listar(req, res, next);
});

router.get ("/clientes/:id", (req, res, next) => {
    clientesController.buscar(req, res, next);
});

router.post ("/clientes", (req, res, next) => {
    clientesController.Criar (req, res, next);
});

router.put ("/clientes/:id", (req, res, next) => {
    clientesController.atualizar(req, res, next);
});

router.delete ("/clientes/:id", (req, res, next) => {
    clientesController.deletar(req, res, next);
});

module.exports = router;
