const pedidoRepository = require('../repositories/pedidoRepository');

exports.newAddToOrder = async (req, res) => {
    const detalle_libro = req.body; 

    try {
        const id_pedido = await pedidoRepository.getUserOrder();
        if (id_pedido == null) {
            return res.status(400).json({ message: "Inicie sesión para agregar libros" });
        }
        const detalle_nuevo = await pedidoRepository.addDetail(detalle_libro, id_pedido.id_pedido);
        res.status(200).json({ message: 'Detalle agregado con éxito', detalle: detalle_nuevo });
    } catch (error) {
        console.error('Error al agregar al pedido:', error);
        res.status(500).json({ message: "Hubo un error al agregar al pedido", error: error.message });
    }
};

exports.addDetalleLibro  = async (req, res) => {
    const {id_libro} = req.params;

    try {
        const id_pedido = await pedidoRepository.getUserOrder();
        if (id_pedido == null) {
            return res.status(400).json({ message: "Inicie sesión para agregar libros" });
        }
        const actualizacion = await pedidoRepository.sumarDetail(id_libro, id_pedido.id_pedido);
        res.status(200).json({ message: 'Detalle actualizado con éxito', detalle: actualizacion });
    } catch (error) {
        console.error('Error al actualizar al pedido:', error);
        res.status(500).json({ message: "Hubo un error al actualizar al pedido", error: error.message });
    }
};

exports.ressDetalleLibro  = async (req, res) => {
    const {id_libro} = req.params;

    try {
        const id_pedido = await pedidoRepository.getUserOrder();
        if (id_pedido == null) {
            return res.status(400).json({ message: "Inicie sesión para agregar libros" });
        }
        const actualizacion = await pedidoRepository.restarDetail(id_libro, id_pedido.id_pedido);
        res.status(200).json({ message: 'Detalle actualizado con éxito', detalle: actualizacion });
    } catch (error) {
        console.error('Error al actualizar al pedido:', error);
        res.status(500).json({ message: "Hubo un error al actualizar al pedido", error: error.message });
    }
};


exports.terminarOrden = async (req, res) => {
    try {
        const id_pedido = await pedidoRepository.getUserOrder();
        if(id_pedido == null){
            res.status(400).json("Inicie sesion para terminar orden");
        }
        const finalizar = await pedidoRepository.finishOrder(id_pedido);
        res.json(finalizar);
    } catch (error) {
       console.error(error);
       res.status(400).json("Hubo un error al finalizar el pedido");
    }
};

exports.deleteDetail = async (req, res) => {
    const { id_libro, id_pedido } = req.params;

    try {
        const resultado = await pedidoRepository.deleteDetallePedido(id_libro, id_pedido);
        res.status(200).json({ message: 'Detalle de pedido eliminado con éxito', resultado });
    } catch (error) {
        console.error('Error al eliminar el detalle del pedido:', error);
        res.status(500).json({ error: 'Hubo un error al eliminar el detalle del pedido' });
    }
};