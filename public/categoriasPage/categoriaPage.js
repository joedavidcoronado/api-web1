const { Connection } = require("pg");

async function mostrarDatos() {
    await llenarCategorias();
}

async function llenarCategorias() {
    const contenedor = document.getElementById('principal');
    
    const categoriasData = await cargarCategorias();
    contenedor.innerHTML = '<button class="aja" id="btnCrear" onclick="abrirModal()">Crear Categoria</button>';
    if (categoriasData && categoriasData.length > 0) {
        let html = "";
        let index = 0;
        for (let i in categoriasData) {
            const categoria = categoriasData[i];
            html += `
                        <div class="contenedorCate">
                            <h2 id="${index}Name">${categoria.nombre_categoria}</h2>
                            <input type="text" id="${index}Cat" value="${categoria.nombre_categoria}" placeholder="Escribe un nombre" style="display: none;">
                            <article>
                                <input type="submit" id="${index}Edt" value="editar" onclick="editar(${index})">
                                <input type="submit" id="${index}Sav" value="guardar" onclick="guardar(${index}, ${categoria.id_categoria})" style="display: none;">
                                <input type="submit" id="${index}Eli" value="eliminar" onclick="eliminar(${categoria.id_categoria})">
                                <input type="submit" id="${index}Can" value="cancelar" onclick="cancelar(${index})" style="display: none;">
                            </article>
                        </div>
                    `;  
                    index++;
        }
        contenedor.innerHTML += html;
        contenedor.innerHTML += '<div id="myModal" class="modal"><div class="modal-content"><span class="close-btn" id="closeModalBtn"></span><h2 class="aja" >Nueva Categoria</h2><input type="text"  class="aja" id="inputNew" placeholder="Ingrese el nombre"><button id="listoBtn" class="aja"  onclick="crearCategoria()" >Listo</button> <p id="msg-error" class="aja"  style="display: none; color: red;">Contenido Vacio</p></div></div>';
    } else {
        console.error("No se pudieron cargar las categorías.");
    }
}

function editar(index){
    const btnEditar = document.getElementById(`${index}Edt`);
    const btnGuardar= document.getElementById(`${index}Sav`);
    const lblName = document.getElementById(`${index}Name`);
    const inputCategoria = document.getElementById(`${index}Cat`);
    const btnEliminar = document.getElementById(`${index}Eli`);
    const btnCancel = document.getElementById(`${index}Can`);

    lblName.style =  "display: none;";
    btnEditar.style = "display: none;";
    btnGuardar.style = "display: inline-block;";
    inputCategoria.style = "display: inline-block;";
    btnEliminar.style = "display: none;";
    btnCancel.style = "display: inline-block;";
}

function cancelar(index){
    const btnEditar = document.getElementById(`${index}Edt`);
    const btnGuardar = document.getElementById(`${index}Sav`);
    const lblName = document.getElementById(`${index}Name`);
    const inputCategoria = document.getElementById(`${index}Cat`);
    const btnEliminar = document.getElementById(`${index}Eli`);
    const btnCancel = document.getElementById(`${index}Can`);

    if (lblName) lblName.style.display = "inline";
    if (btnEditar) btnEditar.style.display = "inline-block";
    if (btnGuardar) btnGuardar.style.display = "none";
    if (inputCategoria) inputCategoria.style.display = "none";
    if (btnEliminar) btnEliminar.style.display = "inline-block";
    if (btnCancel) btnCancel.style.display = "none";
}

function crearCategoria(){
    const newCategoria = document.getElementById('inputNew').value;
    const error =  document.getElementById('msg-error');
    
    if(newCategoria === ""){
        error.style = "display: inline-block; color: red"
        return;
    }
    const data = {
        nombre_categoria: newCategoria
    }

    fetch('/api/admin/newCategoria', {
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
    })
    .then(function(data) {
        mostrarDatos();
    })
    .catch((error) => {
        console.log("Error:", error);
    });
}

function abrirModal(){
    const newCategoria = document.getElementById('inputNew').value;
    const openModalBtn = document.getElementById('btnCrear');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('myModal');
    const listoBtn = document.getElementById('listoBtn');
    const error = document.getElementById('msg-error');

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        error.style.display = 'none'; 
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

}


function eliminar(id_categoria){
    if (window.confirm("¿Estás seguro de eliminar la categoria?")) { 
        fetch('/api/admin/categoriaDelete/'+id_categoria, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response);
            }
        })
        .then(function(data) {
            mostrarDatos();
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    }else{
        return;
    }
}


function irInicio(){
    console.log('entrnaodo aca a la cosa del inico');
    window.location.href = '../admin/admin.html';
}

function getUsuario(){
    const usuario = sessionStorage.getItem('usuario');
    if(!usuario){
        return;
    }else{
        const usuarioObjeto = JSON.parse(usuario);
        const headerDiv = document.getElementById('headerDiv');
        headerDiv.innerHTML = ""

        html = 
        `
            <img src="../otros/log1.jpg" alt="logo.jpeg">
            <h1>Detalle Libro</h1>
            <div id="usuarioDiv">
                <p id="pobre" class="UsuarioInfo">${usuarioObjeto.nombre}</p>
                <p class="UsuarioInfo">${usuarioObjeto.correo}</p>
            </div>
            <button onclick="irAFacturas()"><i id="iconoUsuario" class="fa-solid fa-user"></i></button>
        `;

        headerDiv.innerHTML = html;
    }
}

async function cargarCategorias() {
    try {
        const response = await fetch("/api/search/categorias");
        const data = await response.json();
        return data; 
    } catch (error) {
        console.log(error);
        alert("Ocurrió un error al obtener las categorías");
    }
}



