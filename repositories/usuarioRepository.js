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

exports.getCarrito = async (id_user) => {
    const client = await getConnection();
    const estado = 'pendiente';
    
    try {
        const res = await client.query('select p.id_pedido, p.fecha_pedido, p.estado, l.id_libro, l.titulo, l.autor, dp.id_detalle, dp.cantidad, dp.precio_unitario, dp.subtotal, l.imagen from pedido p join usuario u ON p.id_usuario = u.id_usuario join detalle_pedido dp ON p.id_pedido = dp.id_pedido JOIN libro l ON dp.id_libro = l.id_libro WHERE p.estado = $1 AND p.id_usuario = $2;', ['pendiente', id_user]);
        if (res.rows.length === 0) {
            return null;
        }
        return res;
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};

exports.getFacturas = async (id_user) => {
    const client = await getConnection();
    
    try {
        const res = await client.query('select f.id_factura, f.id_pedido, f.fecha_emision, f.monto_total, u.nit, u.nombre FROM factura f JOIN pedido p ON f.id_pedido = p.id_pedido join usuario u ON p.id_usuario = u.id_usuario where u.id_usuario = $1;', [id_user]);
        if (res.rows.length === 0) {
            return null;
        }
        return res;
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};