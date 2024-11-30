function iniciarSesion() {
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('email').value;
    const contraseña = document.getElementById('password').value;
    const nit = document.getElementById('nit').value;
    const direccion = document.getElementById('direccion').value;

    const msgErrorNombre = document.getElementById('msg-error-nombre');
    const msgErrorEmail1 = document.getElementById('msg-error-email1');
    const msgErrorEmail2 = document.getElementById('msg-error-email2');
    const msgErrorPass = document.getElementById('msg-error-password');
    const msgErrorNIT = document.getElementById('msg-error-nit'); 
    const msgErrorDireccion = document.getElementById('msg-error-direccion'); 
    msgErrorNombre.style.display = "none";
    msgErrorEmail1.style.display = "none";
    msgErrorEmail2.style.display = "none";
    msgErrorPass.style.display = "none";
    msgErrorNIT.style.display = "none";
    msgErrorDireccion.style.display = "none";

    if(nombre === ""){
        msgErrorNombre.innerHTML = "Ingresa un nombre (campo vacio).";
        msgErrorNombre.style.display = "block";
        return;
    }else if (correo === "") {
        msgErrorEmail1.innerHTML = "Ingresa un correo (campo vacio).";
        msgErrorEmail1.style.display = "block";
        return;
    }else if(!esEmailValido(correo)){
        msgErrorEmail2.innerHTML = "Ingresa un correo valido.";
        msgErrorEmail2.style.display = "block";
        return;
    }else if(!contraseña){
        msgErrorPass.innerHTML = "Ingrese una contraseña"
        msgErrorPass.style.display = "block";
        return;
    }else if(nit === ""){
        msgErrorNIT.innerHTML = "Ingresa un NIT (campo vacio).";
        msgErrorNIT.style.display = "block";
        return;
    }else if(direccion === ""){
        msgErrorDireccion.innerHTML = "Ingresa una Direccion (campo vacio).";
        msgErrorDireccion.style.display = "block";
        return;
    }
    registrarUsuario(nombre, correo, contraseña, nit, direccion);
}

function registrarUsuario(nombre, correo, contraseña, nit, direccion){
    const data = {
        nombre: nombre,
        correo: correo,
        contrasena: contraseña,
        nit: nit,
        direccion: direccion,
        tipo: "cliente"
    };

    fetch('/api/usuario/singup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response);
            noSePudo();
        }
        return response.json();
    })
    .then(function(data) {
        sessionStorage.setItem('usuario', JSON.stringify(data));
        cambiarDeVentana(); 
    })
    .catch((error) => {
        console.log("Error:", error);
        noSePudo();
    });
}

function noSePudo(){
    const msgErrorDireccion = document.getElementById('msg-error-direccion'); 
    msgErrorDireccion.innerHTML = "Datos no validos"
    msgErrorDireccion.style.display = "block";
}

function cambiarDeVentana(){
    window.location.href = '../../catalogo/catalogo.html';
}

function esEmailValido(email){
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }