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
                <input type="submit" name="editar" value="editar" onclick="editar(${libro.id_libro})">
                <input type="submit" name="eliminar" value="eliminar" onclick="eliminar(${libro.id_libro})">
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

function editar(id_libro){
    fetch("/api/admin/buscar/"+id_libro)
    .then((response) => {
        return response.json();
    })
    .then(function(data){
        const data2 = data.resultado
        console.log( JSON.stringify(data2));
        localStorage.setItem('libroEntero', JSON.stringify(data2));
        localStorage.setItem('esEdit', 'sip');
        window.location.href = '../detalleEdit/detalleEdit.html';  
    })
    .catch((error) => {
        console.log(error);
        alert("Ocurrion un error al obtener los libros");
    });
}

function eliminar(id_libro){
    if (window.confirm("¿Estás seguro de eliminar libro?")) { 
        fetch('/api/admin/delete/'+id_libro , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.toString());
            }
            return response.json();
        })
        .then(function(data) {
            cargarLosLibros(); 
        })
        .catch((error) => {
            console.log("Error:", error.toString());
        });
    } else {
        return;
    }
}


function getUsuario(){
    const usuario = sessionStorage.getItem('usuario');
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
            <h1>Administrador</h1>
            <div id="usuarioDiv">
                <p class="UsuarioInfo" id="usuarioNombre">${usuarioObjeto.nombre}</p>
                <p class="UsuarioInfo">${usuarioObjeto.correo}</p>
            </div>
            <button onclick="cerrarSesion()"><i id="iconoUsuario" class="fa-solid fa-user"></i></button>
        `;

        headerDiv.innerHTML = html;
    }
}

function cerrarSesion(){
    sessionStorage.clear();
    window.location.href = '../index.html';
}

function addLibro(){
    localStorage.setItem('esEdit', 'nop');
    const imagen = "img/noicon.jpg";

    const libro = {
        id_libro: "", 
        titulo: "", 
        descripcion: "",
        imagen: imagen,
        precio: "",
        ranking: "",
        isbn: "",
        puntuacion: "",
        pais: "",
        stock: ""
    };

    localStorage.setItem('libroEntero', JSON.stringify(libro));
    window.location.href = '../detalleEdit/detalleEdit.html';  
}

function verFacturas(){
    window.location.href = '../facturasTotales/facturasTotales.html';
}

function addCategoria(){
    window.location.href = '../categoriasPage/categoriaPage.html';
}

function otraOpcion(){
    const listaLibros = document.getElementById("catalogo-tres");
    listaLibros.innerHTML = "";
    listaLibros.innerHTML = '<section id="contenedor"><img src="../otros/carpeta.png" alt="bueno"><h2>NO SE ENCONTRÓ EL LIBRO</h2></section>';
}