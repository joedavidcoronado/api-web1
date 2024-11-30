
const adminRepository = require('../repositories/adminRepository');

exports.deleteLibro = async (req, res) => {
    const id_libro = req.params;

    try {
        const resultado = await adminRepository.borrar(id_libro);
        res.status(200).json({ message: 'Libro eliminado con éxito', resultado });
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        res.status(500).json({ error: 'Hubo un error al eliminar el libro', error});
    }
};

exports.newLibro  = async (req, res) => {
    const { titulo, autor, precio, stock, imagen, id_categoria, descripcion, ranking, pais, isbn, puntuacion} = req.body;
    try {
        const resultado = await adminRepository.crear(titulo, autor, precio, stock, imagen, id_categoria, descripcion, ranking, pais, isbn, puntuacion);
        res.status(200).json({ message: 'Libro creado con éxito', resultado });
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        res.status(500).json({ error: 'Hubo un error al creado el libro', error});
    }
};

exports.buscarLibro = async (req, res) => {
    const id_libro = req.params;

    try {
        const resultado = await adminRepository.buscar(id_libro);
        res.status(200).json({ message: 'Libro encontrado', resultado });
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        res.status(500).json({ error: 'Hubo un error al encontrar el libro', error});
    }
};

exports.editarLibro = async (req, res) => {
    const { titulo, autor, precio, stock, imagen, id_categoria, descripcion, ranking, pais, isbn, puntuacion, id_libro} = req.body;

    try {
        const resultado = await adminRepository.editar(titulo, autor, precio, stock, imagen, id_categoria, descripcion, ranking, pais, isbn, puntuacion, id_libro);
        res.status(200).json({ message: 'Libro editado', resultado });
    } catch (error) {
        console.error('Error al editar el libro:', error);
        res.status(500).json({ error: 'Hubo un error al editar el libro', error});
    }
};

exports.getFacturas = async (req, res) => {
    try {
        const resultado = await adminRepository.facturas();
        res.status(200).json({ message: 'Libro encontrado', resultado });
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        res.status(500).json({ error: 'Hubo un error al encontrar el libro', error});
    }
};

exports.editCategoria = async (req, res) => {
    const {nombre_categoria, id_categoria} = req.body;

    try {
        const resultado = await adminRepository.categoriaEdit(nombre_categoria, id_categoria);
        res.status(200).json({ message: 'Categoria editada', resultado });
    } catch (error) {
        console.error('Error al editar la Categoria:', error);
        res.status(500).json({ error: 'Hubo un error al editar la Categoria', error});
    }
};

exports.deleteCategoria = async (req, res) => {
    const id_categoria = req.params;

    try {
        const resultado = await adminRepository.borrarCate(id_categoria);
        res.status(200).json({ message: 'Categoria eliminada con éxito', resultado });
    } catch (error) {
        console.error('Error al eliminar la categoria:', error);
        res.status(500).json({ error: 'Hubo un error al eliminar la categoria', error});
    }
};

exports.crearCategoria = async (req, res) => {
    const nombre_categoria = req.body;
    try {
        const resultado = await adminRepository.crearCategoria(nombre_categoria);
        res.status(200).json({ message: 'Categoria creada con éxito', resultado });
    } catch (error) {
        console.error('Error al eliminar la Categoria:', error);
        res.status(500).json({ error: 'Hubo un error al creado la Categoria', error});
    }
};
