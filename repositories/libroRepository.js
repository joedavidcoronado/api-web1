const dbConnection = require('../dbConnection/postgresConnect');

let connection = null;

const getConnection = async () => {
    if (connection === null) {
        connection = await dbConnection();
    }

    return connection;
};

exports.getLibros = async () => {
    const client = await getConnection();

    try {
        const res = await client.query('SELECT * FROM libro');

        if (res.rows.length === 0) {
            return null;
        }
        return res;
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};

exports.getLibroByIdRepo = async (id_libro) => {
    const client = await getConnection();

    try {
        const res = await client.query('SELECT * FROM libro where id_libro = $1', [id_libro]);
        return res.rows[0];;
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};


exports.getLibroByTituloRepo = async (titulo_libro) => {
    const client = await getConnection();

    try {
        const res = await client.query('SELECT * FROM libro WHERE titulo LIKE $1', [`%${titulo_libro}%`]);
        if (res.rows.length === 0) {
            return null;
        }
        return res;
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};

exports.getLibrosByCategoryRepo = async (id_categoria) => {
    const client = await getConnection();

    try {
        const res = await client.query('SELECT * FROM libro where id_categoria = $1', [id_categoria]);

        if (res.rows.length === 0) {
            return null;
        }
        return res;
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};

 exports.getCategorysRepo = async () => {
    const client = await getConnection();
    try {
        const res = await client.query('SELECT * FROM categoria');
        if (res.rows.length === 0) {
            return null;
        }
        return res;
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};

exports.getMasVendidosRepo = async () => {
    const client = await getConnection();
    try {
        const res = await client.query('SELECT * FROM obtener_libros_con_mas_stock()');
        if (res.rows.length === 0) {
            return null;
        }
        return res;
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};