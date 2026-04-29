// Aqui é a pasta onde ficam as rotas, para organizar melhor o código. Cada arquivo dentro dessa pasta é uma rota diferente, e aqui no index.js é onde juntamos todas as rotas para exportar para o app.js.

const express = require('express');
const router = express.Router();

router.use('/clientes', require('./clientesRouters'));
router.use('/reservas', require('./reservasRouters'));
router.use('/quadras', require('./quadrasRouters'));
router.use('/pagamentos', require('./pagamentosRouters'));
router.use('/bloqueios', require('./bloqueiosRouters'));
router.use('/relatorios', require('./relatoriosRouters'));
router.use('/disponibilidade', require('./disponibilidadeRouters'));

module.exports = router;