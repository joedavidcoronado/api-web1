const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

// GET api/usuario/login
router.post('/login', usuarioController.login);

// GET api/usuario/singup
router.post('/singup', usuarioController.singup);

// GET api/usuario/facturas
router.get('/facturas', usuarioController.facturas);

module.exports = router;