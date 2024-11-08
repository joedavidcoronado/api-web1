const dbConnection = require('../dbConnection/postgresConnect');

let connection = null;

const getConnection = async () => {
    if (connection === null) {
        connection = await dbConnection();
    }

    return connection;
};

exports.getUsuarioByEmail = async (correo) => {
    const client = await getConnection();

    try {
        const res = await client.query('SELECT * FROM usuario WHERE correo = $1', [correo]);

        if (res.rows.length === 0) {
            return null;
        }
        return res.rows[0];
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};

exports.insertNewUser = async (user) => {
    const client = await getConnection();
    try {
        const res = await client.query('INSERT INTO usuario (NOMBRE, CORREO, contrasena , NIT, DIRECCION, TIPO) values ($1, $2, $3, $4, $5, $6)', [user.nombre, user.correo, user.contrasena, user.nit, user.direccion, user.tipo]);       
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};

exports.getFacturas = async (id_usuario) => {
    const client = await getConnection();

    try {
        const res = await client.query('SELECT u.nombre, f.id_factura, f.id_pedido, f.fecha_emision, f.monto_total FROM factura f JOIN pedido p ON f.id_pedido = p.id_pedido JOIN usuario u ON p.id_usuario = u.id_usuario WHERE p.id_usuario = $1;', [id_usuario]);

        if (res.rows.length === 0) {
            return null;
        }
        return res;
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};

