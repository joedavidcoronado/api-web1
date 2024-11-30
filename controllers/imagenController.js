const imagenRepository = require('../repositories/imagenRepository');

const fs = require('fs');
const path = require('path');

const getMimeType = (fileName) => {
    const extension = path.extname(fileName.toLowerCase());
    switch (extension) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        default:
            return 'image/jpeg';
    }
}


exports.createImagen = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }
        const fileName = req.file.originalname;
        const path = req.file.path;

        const imageId = await imagenRepository.createImagen({ fileName, path });
        res.json(imageId);
    } catch (error) {
        console.error(error);
        return null;
    }
}