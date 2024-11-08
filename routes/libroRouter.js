const express = require('express');
const router = express.Router();

const libroController = require('../controllers/libroController');

// GET api/libro
router.get('/libros', libroController.getLibros);

// GET api/libro/1
router.get('/libro/:id_libro', libroController.getLibroById);

// GET api/libro/categoria/1
router.get('/libro/categoria/:id_categoria', libroController.getLibrosByCategory);

// GET api/libro/categorias
router.get('/libro/categorias', libroController.getCategorys)

module.exports = router;