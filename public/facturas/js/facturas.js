function getUsuario(){
    const usuario = sessionStorage.getItem('usuario');
    console.log("esta entrando aca");
    if(!usuario){
        pedidoSinUsuario();
        return;
    }else{
        const usuarioObjeto = JSON.parse(usuario);
        const headerDiv = document.getElementById('header-section');
        headerDiv.innerHTML = ""

        html = 
        `
            <img src="../otros/log1.jpg" alt="logo.jpeg">
            <h1>Libreria</h1>
            <a href="../index.html"><p class="p">Home</p></a>
            <a href="../catalogo/catalogo.html"><p class="p">Catálogo</p></a>
            <a href="attCliente/attCliente.html"><p class="p">Atención al Cliente</p></a>
            <div id="usuarioDiv">
                <p class="UsuarioInfo">${usuarioObjeto.nombre}</p>
                <p class="UsuarioInfo">${usuarioObjeto.correo}</p>
            </div>
            <i id="iconoUsuario" class="fa-solid fa-user"></i>
        `;

        headerDiv.innerHTML = html;
    }
}

function cargarFacturas(){
    const usuario = sessionStorage.getItem('usuario');
    const usuarioObjeto = JSON.parse(usuario);
    console.log('por si acaso');
    console.log(usuarioObjeto.id_usuario);
    fetch("/api/usuario/facturas/"+usuarioObjeto.id_usuario, {mode: "cors"})
        .then((response) => {
            return response.json();
        })
        .then(function(data){
            console.log("imprimiendo facturas")
            console.log(data)
            if (data.error) {
                console.log(data.error);
                otraOpcion();
            } else {
                verFacturas(data);
            }
        })
        .catch((error) => {
            console.log(error);
            otraOpcion();
        });
}

function otraOpcion(){
    const main = document.getElementById('main-conteiner2');
    main.innerHTML = "";
    main.innerHTML = '<section id="contenedor"><img src="../otros/carpeta.png" alt="bueno"><h2>NO TIENES PEDIDOS REALIZADOS</h2></section>';
}



function verFacturas(datos){
        const main = document.getElementById('main-conteiner2');
        main.innerHTML = ""

        if (!datos || datos.length === 0) {
            otraOpcion();
            return;
        }

        let html = "";

        for (let i in datos) {
            const factura = datos[i];
            html += 
                `<article class="articulo">
                    <p>Numero de Factura: ${factura.id_factura}</p>
                    <p>Numero de Pedido: ${factura.id_pedido}</p>
                    <p>Fecha Emision: ${factura.fecha_emision}</p>
                    <p>Nombre Cliente: ${factura.nombre}</p>
                    <p>NIT: ${factura.nit}</p>
                    <p>Monto Total: ${factura.monto_total}</p>
                </article>`;
        }
        main.innerHTML = html;
}