const express = require('express');
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

// POST api/pedido/order
router.post('/order', pedidoController.newAddToOrder);

// PUT /api/pedido/order/finish
router.post('/order/finish', pedidoController.terminarOrden);

module.exports = router;