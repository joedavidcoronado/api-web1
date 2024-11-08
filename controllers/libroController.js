const repositorioLibro = require('../repositories/libroRepository');

exports.getLibros = async (req, res) => {
    try {
        const libros = await repositorioLibro.getLibros();
        const librosFiltrados = libros.rows;

        res.json(librosFiltrados);
    } catch (error) {
       console.error(error);
       res.status(500).json("Hubo un error al realizar el login");
    }
};

exports.getLibroById = async (req, res) => {
    const id_libro = req.params.id_libro;

    try {
        const libro = await repositorioLibro.getLibroByIdRepo(id_libro);
        const libroFiltrado = libro.rows;
        res.json(libroFiltrado);
    } catch (error) {
       console.error(error);
       res.status(500).json("Hubo un error al buscar libro");
    }
};

exports.getLibrosByCategory = async (req, res) => {
    const id_categoria = req.params.id_categoria;

    try {
        const libros = await repositorioLibro.getLibrosByCategoryRepo(id_categoria);
        const librosFiltrado = libros.rows;
        res.json(librosFiltrado);
    } catch (error) {
       console.error(error);
       res.status(500).json("Hubo un error al buscar libro en la categoria");
    }
};

exports.getCategorys = async (req, res) => {
    try {
        const categorias = await repositorioLibro.getCategorysRepo();
        const categoriasFiltrado = categorias.rows;
        res.json(categoriasFiltrado);
    } catch (error) {
       console.error(error);
       res.status(500).json("Hubo un error al cargar las categorias");
    }
};