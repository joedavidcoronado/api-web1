function getUsuario(){
    const usuario = sessionStorage.getItem('usuario');
    console.log("esta entrando aca");
    if(!usuario){
        return;
    }else{
        const usuarioObjeto = JSON.parse(usuario);
        const headerDiv = document.getElementById('headerDiv');
        headerDiv.innerHTML = ""

        html = 
        `
            <img src="../otros/log1.jpg" alt="logo.jpeg">
            <h1>Libreria</h1>
            <a href="../index.html"><p class="p">Home</p></a>
            <a href="../catalogo/catalogo.html"><p class="p">Catálogo</p></a>
            <a href="attCliente/attCliente.html"><p class="p">Atención al Cliente</p></a>
            <div id="usuarioDiv">
                <p id="pobre" class="UsuarioInfo">${usuarioObjeto.nombre}</p>
                <p class="UsuarioInfo">${usuarioObjeto.correo}</p>
            </div>
            <button onclick="irAFacturas()"><i id="iconoUsuario" class="fa-solid fa-user"></i></button>
        `;

        headerDiv.innerHTML = html;
    }
}

function cargarPedido(){
    const usuario = sessionStorage.getItem('usuario');
    const usuarioObjeto = JSON.parse(usuario);
    if(!usuario){
        otraOpcion()
        return;
    }
    fetch("/api/usuario/carrito/"+usuarioObjeto.id_usuario, {mode: "cors"})
        .then((response) => {
            return response.json();
        })
        .then(function(data){
            console.log(data)
            if(data.error){
                otraOpcion();
            }else{
                verCarrito(data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function otraOpcion(){
    const main = document.getElementById('main');
    main.innerHTML = "";
    main.innerHTML = '<section id="contenedor"><img src="../otros/dinero.png" alt="dinero.png"><h2>CARRITO VACIO</h2></section>';
}


function verCarrito(datos){
        const main = document.getElementById('main');
        main.innerHTML = ""
    
        let html = "";
        html = 
        `
            <section id="section-izq">
                <div id="scroll-container1">
                </div>
            </section>

            <section id="section-der">
                <div id="scroll-container2">
                </div>
            </section>
        `;
        main.innerHTML = html;

        //___________________________________________________________________
        let total= 0.00;

        const parteIzquierda = document.getElementById('scroll-container1');
        const parteDerecha = document.getElementById('scroll-container2');

        let html1 = "";
        let html2 = "";
        let html3 = "";
        

        for (let i in datos) {
            const libro = datos[i];
            const subtotal = parseFloat(libro.subtotal.trim());
            if (!isNaN(subtotal)) {
                console.log(subtotal);
                total += subtotal;
            } 
            html1 += 
                `<article class="article-izq">
                    <img src="../${libro.imagen}" alt="imagenLibro.png">
                    <p>${libro.titulo}</p>
                </article>`;

            html2 += 
                `<article class="article-der">
                    <p class="product-name">${libro.titulo}</p>
                    <p class="product-price">Precio: Bs${libro.precio_unitario}</p>
                    <p class="product-cantidad">Cantidad: </p>
                    <input type="submit" value="+" onclick="sumar(${libro.id_libro})">
                    <p class="product-cantidad">${libro.cantidad}</p>
                    <input type="submit" value="-" onclick="restar(${libro.id_libro})">
                    <p class="product-subtotal">Subtotal: Bs${libro.subtotal}</p>
                    <button onclick="eliminarDetalle(${libro.id_libro}, ${libro.id_pedido})" value="Eliminar">Eliminar</button>
                </article>`;
        }

        html3 +=
        `
        <section id="presentacion">
            <p>NOMBRE</p>
            <p>PRECIO</p>
            <p>CANTIDAD</p>
            <p>SUBTOTAL</p>
        </section>
        <section id="medio">
        
        </section>
        <section id="fin">
            <p>TOTAL: BS</p>
            <p>${total}</p>
            <p id="quieroDormirDiosMio">¡Comprar!</p>
            <button onclick="concretarPedido()"><i class="fa-solid fa-arrow-right"></i></button>
        </section>
        `;

        parteIzquierda.innerHTML = html1;
        parteDerecha.innerHTML = html3;

        const medio =  document.getElementById('medio');
        medio.innerHTML = html2;
}

function concretarPedido(){
    fetch('/api/pedido/order/finish', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response);
        }
        return response.json();
    })
    .then(function(data) {
        if (window.confirm("¿Estás seguro de realizar la compra?")) { 
            cambiarDeVentana(); 
        } else {
            return;
        }
    })
    .catch((error) => {
        console.log("Error:", error);
        noSePudo();
    });
}

function sumar(id_libro){ 
    fetch('/api/pedido/orden/add/'+id_libro, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response);
        }
        return response.json();
    })
    .then(function(data) {
        cargarPedido();
        return 'todo cool';
    })
    .catch((error) => {
        console.log("Error:", error);
    });
}

function restar(id_libro){ 
    fetch('/api/pedido/orden/rest/'+id_libro, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response);
        }
        return response.json();
    })
    .then(function(data) {
        cargarPedido();
        return 'todo cool';
    })
    .catch((error) => {
        console.log("Error:", error);
    });
}

function eliminarDetalle(id_libro, id_pedido){
    fetch('/api/pedido/ordered/deleteDetail/'+id_libro+"/"+id_pedido, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response);
        }
        return response.json();
    })
    .then(function(data) {
        if (window.confirm("¿Estás seguro de eliminar detalle?")) { 
            cargarPedido(); 
        } else {
            return;
        }
    })
    .catch((error) => {
        console.log("Error:", error);
    });
}

function cambiarDeVentana(){
    window.location.href = "../facturas/facturas.html"
}

function irAFacturas(){
    window.location.href = "../facturas/facturas.html"
}