
function irANuevaPagina() {
    window.location.href = '../catalogo/catalogo.html';
}

function iniciarSesion(){
    window.location.href = 'login/login.html';
}

function getMasVendidosSc(){
    fetch("/api/moreSells", {mode: "cors"})
        .then((response) => {
            return response.json();
        })
        .then(function(data){
            console.log("imprimiendo libros")
            console.log(data)
            mostrarLibrosYNombres(data);
        })
        .catch((error) => {
            console.log(error);
            alert("Ocurrion un error al obtener los libros");
        });
}

function getLibroCategoria(){
    fetch("/api/moreSells", {mode: "cors"})
        .then((response) => {
            return response.json();
        })
        .then(function(data){
            console.log("imprimiendo libros")
            console.log(data)
            mostrarLibrosYNombres(data);
        })
        .catch((error) => {
            console.log(error);
            alert("Ocurrion un error al obtener los libros");
        });
}

function mostrarLibrosYNombres(libros) {
    const listaLibros = document.getElementById("principal-dos-fotos");
    const listaNombres = document.getElementById("principal-dos-nombres");

    listaLibros.innerHTML = "";
    listaNombres.innerHTML = "";

    if (libros.length === 0) {
        listaLibros.innerHTML = '<div>No tiene Libros registrados</div>';
        listaNombres.innerHTML = '<div>No tiene Libros registrados</div>';
        return;
    }

    let htmlLibros = "";
    let htmlNombres = "";

    for (let i in libros) {
        const libro = libros[i];
        htmlLibros += `<img src="${libro.imagen}" alt="foto${i}">`;
        htmlNombres += `<p>${libro.titulo}</p>`;
    }

    listaLibros.innerHTML = htmlLibros;
    listaNombres.innerHTML = htmlNombres;
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
            <img src="otros/log1.jpg" alt="logo.jpeg">
            <a><p class="p">Home</p></a>
            <a href="catalogo/catalogo.html"><p class="p">Catálogo</p></a>
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