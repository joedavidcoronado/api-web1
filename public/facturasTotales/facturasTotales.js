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
            <h1>Pedidos Totales</h1>
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
    fetch("/api/admin/facturas")
        .then((response) => {
            return response.json();
        })
        .then(function(data){
            if (data.error) {
                otraOpcion();
            } else {
                verFacturas(data.resultado);
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
            const nuevaFecha = cambiarFecha(factura.fecha_emision);
            html += 
                `<article class="articulo">
                    <p>Numero de Factura: ${factura.id_factura}</p>
                    <p>Numero de Pedido: ${factura.id_pedido}</p>
                    <p>Fecha Emision: ${nuevaFecha}</p>
                    <p>Nombre Cliente: ${factura.nombre}</p>
                    <p>NIT: ${factura.nit}</p>
                    <p>Monto Total: ${factura.monto_total}</p>
                </article>`;
        }
        main.innerHTML = html;
}

function cambiarFecha(fecha){
    const fecha2 = new Date(fecha);


    const fechaFormateada = fecha2.toLocaleString('es-ES', {
        weekday: 'long',   // Día de la semana (ej. "lunes")
        year: 'numeric',   // Año completo (ej. "2024")
        month: 'long',     // Mes completo (ej. "noviembre")
        day: 'numeric',    // Día del mes (ej. "25")
        hour: '2-digit',   // Hora (ej. "09")
        minute: '2-digit', // Minuto (ej. "48")
        second: '2-digit', // Segundo (ej. "32")
        hour12: false      // Usar formato de 24 horas
    });

    return fechaFormateada;
}