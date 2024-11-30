const express = require('express');
const router = express.Router();

const libroController = require('../controllers/libroController');

// GET api/libro
router.get('/libros', libroController.getLibros);

// GET api/libro/cosmos
router.get('/libro/:titulo', libroController.getLibroByTitulo);

// GET api/libroID/1
router.get('/otraCosaId/:id_libro', libroController.getLibroById);

// GET api/libro/categoria/1
router.get('/libro/categoria/:id_categoria', libroController.getLibrosByCategory);

// GET api/search/categorias
router.get('/search/categorias', libroController.getCategorys)

// GET api/moreSells
router.get('/moreSells', libroController.getMasVendidos)

module.exports = router;