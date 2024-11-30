const dbConnection = require('../dbConnection/postgresConnect');

let connection = null;

const getConnection = async () => {
    if (connection === null) {
        connection = await dbConnection();
    }

    return connection;
};

exports.borrar = async (id_libro) => {
    const client = await getConnection();

    try {
        const res = await client.query(
            'DELETE  from libro where ID_LIBRO = $1;', [id_libro.id]
        );
        return res.rows[0];
    } catch (err) {
        console.error('Error al eliminar detalle del pedido:', err);
        throw err;
    }
};

exports.crear = async (titulo, autor, precio, stock, imagen, id_categoria, descripcion, ranking, pais, isbn, puntuacion) => {
    const client = await getConnection();

    try {
        const res = await client.query(
            'INSERT INTO libro (titulo, autor, precio, stock, imagen, id_categoria, descripcion, ranking, pais, isbn, puntuacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);', 
            [titulo, autor, precio, stock, imagen, id_categoria, descripcion, ranking, pais, isbn, puntuacion]
        );
        return res.rows[0];
    } catch (err) {
        console.error('Error al insertar libro:', err);
        throw err;
    }
};

exports.editar = async (titulo, autor, precio, stock, imagen, id_categoria, descripcion, ranking, pais, isbn, puntuacion, id_libro) => {
    const client = await getConnection();

    try {
        const res = await client.query(
            'UPDATE libro SET titulo = $1, autor = $2, precio = $3, stock = $4, imagen = $5, id_categoria = $6, descripcion = $7, ranking = $8, pais = $9, isbn = $10, puntuacion = $11 where ID_LIBRO = $12;', [titulo, autor, precio, stock, imagen, id_categoria, descripcion, ranking, pais, isbn, puntuacion, id_libro]
        );
        return;
    } catch (err) {
        console.error('Error al editar el libro:', err);
        throw err;
    }
};

exports.buscar = async (id_libro) => {
    const client = await getConnection();

    try {
        const res = await client.query(
            'select * from libro where ID_LIBRO = $1;', [id_libro.id]
        );
        return res.rows[0];
    } catch (err) {
        console.error('Error al buscar libro:', err);
        throw err;
    }
};

exports.facturas = async ()  => {
    const client = await getConnection();

    try {
        const res = await client.query(
            'select * from factura f join PEDIDO P on p.ID_PEDIDO = f.ID_PEDIDO join USUARIO U on u.ID_USUARIO = p.ID_USUARIO ;'
        );
        return res.rows;
    } catch (err) {
        console.error('Error al buscar las facturas:', err);
        throw err;
    }
};

exports.categoriaEdit = async (nombre_categoria, id_categoria) => {
    const client = await getConnection();

    try {
        const res = await client.query(
            'UPDATE categoria SET nombre_categoria = $1 Where id_categoria = $2;', [nombre_categoria, id_categoria]
        );
        return;
    } catch (err) {
        console.error('Error al editar el libro:', err);
        throw err;
    }
};

exports.borrarCate = async (id_categoria) => {
    const client = await getConnection();
    try {
        await client.query(
            'UPDATE libro SET id_categoria = 16 WHERE id_categoria = $1;', [id_categoria.id_categoria]);

        const res = await client.query(
                'delete from CATEGORIA C where id_categoria = $1;', [id_categoria.id_categoria]);

        return res.rows[0];
    } catch (err) {
        console.error('Error al eliminar la categoria:', err);
        throw err;
    }
};

exports.crearCategoria = async (nombre_categoria) => {
    const client = await getConnection();

    try {
        const res = await client.query(
            'INSERT INTO categoria (nombre_categoria) VALUES ($1);', 
            [nombre_categoria.nombre_categoria]
        );
        return res.rows[0];
    } catch (err) {
        console.error('Error al insertar libro:', err);
        throw err;
    }
};
