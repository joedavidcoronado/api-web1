const { getLibros } = require("../../../controllers/libroController");


function irANuevaPagina() {
    window.location.href = '../detalle/detalle.html';
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
    fetch("/api/libro/categorias", {mode: "cors"})
        .then((response2) => {
            return response2.json();
        })
        .then(function(data2){
            console.log("imprimiendo categorias")
            console.log(data2)
            mostrarCategorias(data2);
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
        listaLibros.innerHTML = '<div class="col-12 text-center mb-5">No tiene contactos registrados. Presione el boton "Nuevo contacto" para registrar uno nuevo.</div>'
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
                <input type="submit" name="ver mas" value="Ver mas" onclick="irANuevaPagina()">
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
            `<input type="submit" name="${categoria.nombre_categoria}" value="${categoria.nombre_categoria}"></input>`;
    }

    listaCategorias.innerHTML = html;
}