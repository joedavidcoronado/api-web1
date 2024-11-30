const repositorioUsuario = require('../repositories/usuarioRepository');
const repositorioPedido = require('../repositories/pedidoRepository');

exports.login = async (req, res) => {
    const {correo, contrasena} = req.body;
    try {
        const user = await repositorioUsuario.getUsuarioByEmail(correo);

        if(!user){
            return res.status(401).json("Usuario o contraseña incorrectos");
        }
        if(user.contrasena != contrasena){
            return res.status(401).json("Usuario o contraseña incorrectos");
        }

        delete user.contrasena;
        const pedido = await repositorioPedido.insertPedido(user.id_usuario);
        if(pedido === null){
            return res.status(401).json("Fallo al crear el pedido");
        }
        res.json(user);
    } catch (error) {
       console.error(error);
       res.status(500).json("Hubo un error al realizar el login");
    }
};

exports.singup = async (req, res) => {
    const user = req.body;
    try {
        const usuario = await repositorioUsuario.insertNewUser(user);
        res.json(user);
        const pedido = await repositorioPedido.insertPedido(user.id_usuario);
        id_usuario = user.id_usuario;
        if(pedido === null){
            return res.status(401).json("Fallo al crear el pedido");
        }
    } catch (error) {
       console.error(error);
       res.status(500).json("Hubo un error al realizar el signup");
    }
};

exports.carrito = async (req, res) => {
    const id_user = req.params.id_user;
    try {
        const pedidosHechos = await repositorioUsuario.getCarrito(id_user);
        const pedisosHechosFiltrado = pedidosHechos.rows;
        res.json(pedisosHechosFiltrado);
    } catch (error) {
       console.error(error);
       res.status(500).json({ error: "Hubo un error al buscar el libro." });
    }
};

exports.facturas = async (req, res) => {
    const id_user = req.params.id_user;
    try {
        const pedidosHechos = await repositorioUsuario.getFacturas(id_user);
        const pedisosHechosFiltrado = pedidosHechos.rows;
        res.json(pedisosHechosFiltrado);
    } catch (error) {
       console.error(error);
       res.status(500).json({ error: "Hubo un error al buscar las facturas." });
    }
};