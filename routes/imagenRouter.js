const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const imagenController = require('../controllers/imagenController');

const uploadDirectory = process.env.UPLOADS_PATH || 'uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// GET /api/image/123
router.get('/:imagenId', imagenController.getImagenById);

// POST /api/image
router.post('/', upload.single('file'), imagenController.createImagen);

module.exports = router;