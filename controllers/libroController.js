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
        res.json(libro);
    } catch (error) {
       console.error(error);
       res.status(500).json("Hubo un error al buscar libro");
    }
};


exports.getLibroByTitulo = async (req, res) => {
    const titulo_libro2 = req.params.titulo;
    try {
        const libro = await repositorioLibro.getLibroByTituloRepo(titulo_libro2);
        const otro = libro.rows
        res.json(otro);
    } catch (error) {
       console.error(error);
       res.status(500).json({ error: "Hubo un error al buscar el libro." });
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

exports.getMasVendidos = async (req, res) => {
    try {
        const libros = await repositorioLibro.getMasVendidosRepo();
        const librosFiltrado = libros.rows;
        res.json(librosFiltrado);
    } catch (error) {
       console.error(error);
       res.status(500).json("Hubo un error al cargar los libros mas vendidos");
    }
};