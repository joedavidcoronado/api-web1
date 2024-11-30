
async function mostrarDatos() {
    const libro = obtenerLibro();
    if (!libro) {
        console.error("No se pudo obtener el libro.");
        return;
    }
    mostrarFormulario(libro);
    await llenarCategorias();
}

function obtenerLibro() {
    const otro = localStorage.getItem('libroEntero');
    return otro ? JSON.parse(otro) : null;
}

async function mostrarFormulario(libro) {
    const contenedor1 = document.getElementById("principal-uno");
    if (contenedor1) {
        contenedor1.innerHTML = `
            <img src="../${libro.imagen}" alt="foto1.jpg" id="imagenMini">
            <input type="hidden" value="${libro.imagen}" id="l-foto">
            <input type="file" name="file" id="l-file" >
            <p class="labels">Precio:</p>
            <input type="number" name="precio" value="${libro.precio}"  placeholder="   Escribre un precio" class="input-new" id="l-precio">
            <br>
            <p class="labels">Categorias:</p>
            <select name="categorias" id="l-categorias" class="input-new" ></select>
            <p class="labels">Stock:</p>
            <input type="number" name="precio"  placeholder="   Cantidad de items" value="${libro.stock}" class="input-new" id="l-stock">
        `;
    }
    document.querySelector("#l-file").addEventListener('change', uploadImage)

    const contenedor2 = document.getElementById("principal-dos");
    if (contenedor2) {
        contenedor2.innerHTML = `
            <h3 class="label2">_________________ Titulo _________________</h3>
            <input type="hidden" value="${libro.id_libro}" id="l-id">
            <input type="text" name="titulo" placeholder="   Escribre un titulo" value="${libro.titulo}" id="l-titulo">
            <h3 class="label2">_________________ Descripcion _________________</h3>
            <input type="text" name="descripcion" placeholder="   Escribre una descripcion" value="${libro.descripcion}" id="l-descripcion">
            <div id="horizontal-icon">
                <div class="cajones">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p><b>Ranking</b></p>
                    <input type="number" name="ranking" value="${libro.ranking}" placeholder=" ..."  id="l-ranking">
                </div>
                <div class="cajones">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p><b>ISBN</b></p>
                    <input type="number" name="isbn" value="${libro.isbn}" placeholder=" ..."  id="l-isbn">
                </div>
                <div class="cajones">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p><b>Puntuación</b></p>
                    <input type="number" name="puntuacion" value="${libro.puntuacion}" placeholder=" ..."  id="l-puntuacion">
                </div>
                <div class="cajones">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p><b>Pais</b></p>
                    <input type="text" name="pais" value="${libro.pais}" placeholder="     ..."  id="l-pais">
                </div>
            </div>
            <section id="seleccionar_cantidad">
                <input type="submit" name="guardar" id="guardar" value="agregar" onclick="guardar()">
            </section>
        `;
    }
}

async function llenarCategorias() {
    const categorias = document.getElementById('l-categorias');
    if (!categorias) {
        console.error("No se encontró el select de categorías.");
        return;
    }

    categorias.innerHTML = ""; 
    const categoriasData = await cargarCategorias();
    if (categoriasData && categoriasData.length > 0) {
        let html8 = "";
        for (let i in categoriasData) {
            const categ = categoriasData[i];
            html8 += `<option value="${categ.id_categoria}">${categ.nombre_categoria}</option>`;  
        }
        categorias.innerHTML = html8;
    } else {
        console.error("No se pudieron cargar las categorías.");
    }
}


function guardar(){

    const id_libro = document.getElementById('l-id').value;
    const titulo = document.getElementById('l-titulo').value;
    const descripcion = document.getElementById('l-descripcion').value;
    const imagen = document.getElementById('l-foto').value;
    const precio = document.getElementById('l-precio').value;
    const ranking = document.getElementById('l-ranking').value;
    const isbn = document.getElementById('l-isbn').value;
    const puntuacion = document.getElementById('l-puntuacion').value;
    const pais = document.getElementById('l-pais').value;
    const id_categoria = document.getElementById('l-categorias').value;
    const stock = document.getElementById('l-stock').value;


    const data = {
        id_libro: id_libro, 
        titulo: titulo, 
        descripcion: descripcion,
        imagen: imagen,
        precio: precio,
        ranking: ranking,
        isbn: isbn,
        puntuacion: puntuacion,
        pais: pais,
        id_categoria: id_categoria,
        stock: stock
    };

    const accion = localStorage.getItem('esEdit');

    if(accion === 'sip'){
        // ACA EDITAMOS MI REY
        fetch('/api/admin/edit', {
            method: "PUT",
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
            alert('editado con exito :)');
            window.location.href = '../admin/admin.html';
        })
        .catch((error) => {
            console.log("Error:", error);
        });

    }else if(accion === 'nop'){
        //ACA AGREGAMOS UNO NUEVO MI REY

        fetch('/api/admin/newlibro', {
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
            alert('ya se agrego mi rey')
            irInicio();
        })
        .catch((error) => {
            console.log("Error:", error);
        });
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

function irAFacturas(){
    window.location.href = "../facturas/facturas.html"
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

function uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        document.getElementById("imagenMini").src = imageURL;
        document.getElementById("l-foto").value = imageURL;
    }
}

