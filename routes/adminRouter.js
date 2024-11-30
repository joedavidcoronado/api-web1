const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

// POST api/admin/delete/id
router.post('/delete/:id', adminController.deleteLibro);

// POST api/admin/newlibro
router.post('/newlibro', adminController.newLibro);

// POST api/admin/facturas
router.get('/facturas', adminController.getFacturas);

// GET api/admin/delete/id
router.get('/buscar/:id' , adminController.buscarLibro);

// PUT api/admin/edit
router.put('/edit' , adminController.editarLibro);

// PUT api/admin/categoriaEdit
router.put('/categoriaEdit' , adminController.editCategoria);

// POST api/admin/categoriaDelete/1
router.post('/categoriaDelete/:id_categoria', adminController.deleteCategoria);  

// POST api/admin/newCategoria
router.post('/newCategoria', adminController.crearCategoria);

module.exports = router;