const express = require('express');
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

// POST /api/pedido/order
router.post('/order', pedidoController.newAddToOrder);

// POST /api/pedido/order/finish
router.post('/order/finish', pedidoController.terminarOrden);

// POST /api/pedido/ordered/deleteDetail/:id_libro/:id_pedido
router.post('/ordered/deleteDetail/:id_libro/:id_pedido', pedidoController.deleteDetail);

// POST /api/pedido/orden/add
router.post('/orden/add/:id_libro', pedidoController.addDetalleLibro);

// POST /api/pedido/orden/rest
router.post('/orden/rest/:id_libro', pedidoController.ressDetalleLibro);


module.exports = router;