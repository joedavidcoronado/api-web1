
function iniciarSesion(){
    window.location.href = '../login/login.html';
}

function cargarElLibro(){
    const id = localStorage.getItem('libro-id');
    fetch("/api/otraCosaId/"+id)
        .then((response) => {
            return response.json();
        })
        .then(function(data){
            console.log("imprimiendo el libro");
            mostrarDatos(data);
        })
        .catch((error) => {
            console.log(error);
            alert("Ocurrion un error al obtener los libros");
        });
}

function mostrarDatos(libroData){
    const libro =libroData;

    const contenedor1 = document.getElementById("principal-uno");
    contenedor1.innerHTML = "";
    let html1 = "";
        html1 += 
        `
        <img src="../${libro.imagen}" alt="foto1.jpg">
        <h2>Precio: ${libro.precio}</h2>
        `;
    contenedor1.innerHTML = html1;

    const contenedor2 = document.getElementById("principal-dos");
    contenedor2.innerHTML = "";

    let html2 = "";
        html2 += 
            `
            <h1>${libro.titulo}</h1>
                <p>${libro.descripcion}</p>
                <div id="horizontal-icon">
                    <div class="cajones">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <p><b>Ranking</b></p>
                        <p>0${libro.ranking}</p>
                    </div>
                    <div class="cajones">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <p><b>ISBN</b></p>
                        <p>${libro.isbn}</p>
                    </div>
                    <div class="cajones">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <p><b>Puntuación</b></p>
                        <p>${libro.puntuacion}</p>
                    </div>
                    <div class="cajones">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <p><b>Pais</b></p>
                        <p>${libro.pais}</p>
                    </div>
                </div>
                <section id="seleccionar_cantidad">
                    <input type="submit" name="agregarCarrito" id="agregarCarrito" value="Agregar al Carrito" onclick="agregarAlCarrito()">
                    <input type="number" id="cantidad" name="cantidad" min="1" max="100" value="1" step="1">
                </section>    
            `;
    contenedor2.innerHTML = html2;
}

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

function agregarAlCarrito(){

    const id = localStorage.getItem('libro-id');
    const precio = localStorage.getItem('precio');
    const cantidad = document.getElementById('cantidad').value;

    const data = {
        id_libro: id, 
        cantidad: cantidad, 
        precio_unitario: precio
    };

    fetch('/api/pedido/order', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response);
        }
        return response.json();
    })
    .then(function(data) {
        console.log("los datos detalle son: " + data);
        alert("Ya se subio el detalle");
    })
    .catch((error) => {
        console.log("Error:", error);
    });
}




function irACarrito(){
    window.location.href = '../cart/cart.html';
}

function irAFacturas(){
    window.location.href = "../facturas/facturas.html"
}