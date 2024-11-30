const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

// GET api/usuario/login
router.post('/login', usuarioController.login);

// GET api/usuario/singup
router.post('/singup', usuarioController.singup);

// GET api/usuario/carrito
router.get('/carrito/:id_user', usuarioController.carrito);

// GET api/usuario/facturas/:id_user
router.get('/facturas/:id_user', usuarioController.facturas);

module.exports = router;