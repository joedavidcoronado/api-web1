const pedidoRepository = require('../repositories/pedidoRepository');

exports.newAddToOrder = async (req, res) => {
    const detalle_libro = req.body;
    try {
        const id_pedido = await pedidoRepository.getUserOrder();
        if(id_pedido == null){
            res.status(400).json("Inicie sesion para agrega libros");
        }
        const detalle_nuevo = await pedidoRepository.addDetail(detalle_libro, id_pedido);
        res.json(detalle_nuevo);
    } catch (error) {
       console.error(error);
       res.status(500).json("Hubo un error al agregar al pedido");
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



