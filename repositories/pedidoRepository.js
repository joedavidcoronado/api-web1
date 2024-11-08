const dbConnection = require('../dbConnection/postgresConnect');

let connection = null;
let id_enUso;

const getConnection = async () => {
    if (connection === null) {
        connection = await dbConnection();
    }
    return connection;
};

exports.insertPedido = async (user_id) => {
    const client = await getConnection();
    const estado = 'pendiente';
    id_enUso = user_id;
    try {
        const res = await client.query('INSERT INTO pedido (id_usuario, estado) values ($1, $2)', [user_id, estado]);       
        return res.rows[0];
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};

exports.getUserOrder = async () => {
    const client = await getConnection();
    const estado = 'pendiente';

    try {
        const res = await client.query('SELECT id_pedido FROM pedido WHERE id_usuario = $1 AND estado = $2 ', [id_enUso, estado]);

        if (res.rows.length === 0) {
            return null;
        }
        return res.rows[0];
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};

exports.addDetail = async (detalle, id_pedido) => {
    const client = await getConnection();
    const {id_libro, cantidad, precio_unitario} = detalle;
    try {
        const res = await client.query('INSERT INTO detalle_pedido (id_pedido, id_libro, cantidad, precio_unitario) VALUES ($1, $2, $3, $4);', [id_pedido.id_pedido, id_libro, cantidad, precio_unitario]);
        return 'Insertado con exito';
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};


exports.finishOrder = async (id_pedido) => {
    const client = await getConnection();
    try {
        if (!id_pedido || !id_pedido.id_pedido) {
            return 'Inicie sesión';
        }
        const pedidoId = id_pedido.id_pedido;
        const totalResult = await client.query('SELECT SUM(subtotal) AS total_pedido FROM detalle_pedido WHERE id_pedido = $1;', [pedidoId]);
        const total = totalResult.rows[0].total_pedido;

        if (total == null) {
            total = 0;
        }

        const res = await client.query('INSERT INTO factura (id_pedido, monto_total) VALUES ($1, $2);', [pedidoId, total]);

        const alterPedido = await client.query('UPDATE pedido SET estado = $1 WHERE id_pedido = $2;', ['completado', pedidoId]);

        return 'Pedido realizado satisfactoriamente';
    } catch (err) {
        console.error('Error en la consulta:', err);
        throw err;
    }
};


