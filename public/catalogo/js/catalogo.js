const { getLibros } = require("../../../controllers/libroController");

function iniciarSesion(){
    window.location.href = '../login/login.html';
}

function irANuevaPagina(id, precio) {
    localStorage.setItem('precio', precio);
    localStorage.setItem('libro-id', id);
    window.location.href = '../detalle/detalle.html';
}

function recargarPagina(id) {
    fetch("/api/libro/categoria/"+id, {mode: "cors"})
        .then((response) => {
            return response.json();
        })
        .then(function(data){
            console.log("imprimiendo libros")
            console.log(data)
            mostrarLibros(data);
        })
        .catch((error) => {
            console.log(error);
            alert("Ocurrion un error al obtener los libros");
        });
}

function cargarLosLibros(){
    fetch("/api/libros", {mode: "cors"})
        .then((response) => {
            return response.json();
        })
        .then(function(data){
            console.log("imprimiendo libros")
            console.log(data)
            mostrarLibros(data);
        })
        .catch((error) => {
            console.log(error);
            alert("Ocurrion un error al obtener los libros");
        });
}



function cargarLasCategorias(){
    fetch("/api/search/categorias", {mode: "cors"})
        .then((response2) => {
            return response2.json();
        })
        .then(function(data){
            console.log("imprimiendo categorias")
            console.log(data)
            mostrarCategorias(data);
        })
        .catch((error) => {
            console.log(error);
            alert("Ocurrion un error al obtener las categorias");
        });
}

function mostrarLibros(libros){
    const listaLibros = document.getElementById("catalogo-tres");
    listaLibros.innerHTML = "";
    
    if(libros.length === 0){
        listaLibros.innerHTML = '<div>No tiene contactos registrados</div>'
        return;
    }

    let html = "";
    for (let i in libros) {
        const libro = libros[i];
        html += 
            `<article class="tres-producto">
                <img src= "../${libro.imagen}">
                <h2>${libro.titulo}</h2>
                <p>Precio: <b>${libro.precio} </b></p>
                <input type="submit" name="ver mas" value="Ver mas" onclick="irANuevaPagina(${libro.id_libro}, ${libro.precio})">
            </article>`;
    }

    listaLibros.innerHTML = html;
}

function mostrarCategorias(categorias){
    const listaCategorias = document.getElementById("catalogo-dos-cates");
    listaCategorias.innerHTML = "";
    
    if(categorias.length === 0){
        listaCategorias.innerHTML = '<div class="col-12 text-center mb-5">No tiene contactos registrados. Presione el boton "Nuevo contacto" para registrar uno nuevo.</div>'
        return;
    }

    let html = "";
    for (let i in categorias) {
        const categoria = categorias[i];
        html += 
            `<input type="submit" name="${categoria.nombre_categoria}" value="${categoria.nombre_categoria}" onclick="recargarPagina(${categoria.id_categoria})"></input>`;  /**/
    }

    listaCategorias.innerHTML = html;
}

function buscarLibro(){
    var nombre = document.getElementById("inputBuscar").value
    fetch("/api/libro/"+nombre, {mode: "cors"})
        .then((response) => {
            return response.json();
        })
        .then(function(data){
            console.log("imprimiendo libros")
            console.log(data)
            
            if (data.error) {
                console.log(data.error);
                otraOpcion();
            } else {
                mostrarLibros(data);
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Ocurrion un error al obtener los libros");
        });
}


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
            <a><p class="p">Catálogo</p></a>
            <a href="attCliente/attCliente.html"><p class="p">Atención al Cliente</p></a>
            <div id="usuarioDiv">
                <p class="UsuarioInfo">${usuarioObjeto.nombre}</p>
                <p class="UsuarioInfo">${usuarioObjeto.correo}</p>
            </div>
            <button onclick="irAFacturas()"><i id="iconoUsuario" class="fa-solid fa-user"></i></button>
        `;

        headerDiv.innerHTML = html;
    }
}

function irAFacturas(){
    window.location.href = "../facturas/facturas.html"
}

function irACarrito(){
    window.location.href = '../cart/cart.html';
}

function pedidoSinUsuario(){
    
}

function otraOpcion(){
    const listaLibros = document.getElementById("catalogo-tres");
    listaLibros.innerHTML = "";
    listaLibros.innerHTML = '<section id="contenedor"><img src="../otros/carpeta.png" alt="bueno"><h2>NO SE ENCONTRÓ EL LIBRO</h2></section>';
}