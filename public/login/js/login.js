function iniciarSesion() {
    const correo = document.getElementById('email').value;
    const contraseña = document.getElementById('password').value;

    const msgErrorEmail1 = document.getElementById('msg-error-email1');
    const msgErrorEmail2 = document.getElementById('msg-error-email2');
    const msgErrorInit = document.getElementById('msg-error-inicio'); 
    msgErrorEmail1.style.display = "none";
    msgErrorEmail2.style.display = "none";
    msgErrorInit.style.display = "none";


    if (correo === "") {
        msgErrorEmail1.innerHTML = "Ingresa un correo (campo vacio).";
        msgErrorEmail1.style.display = "block";
        return;
    }else if(!esEmailValido(correo)){
        msgErrorEmail2.innerHTML = "Ingresa un correo valido.";
        msgErrorEmail2.style.display = "block";
        return;
    }else if(contraseña === ""){
        msgErrorInit.innerHTML = "Ingrese una contraseña"
        msgErrorInit.style.display = "block";
        return;
    }
    guardarSesion(correo, contraseña);
}

function guardarSesion(correo, contraseña) {
    const data = {
        correo: correo,
        contrasena: contraseña
    };

    fetch('/api/usuario/login', {
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
        sessionStorage.setItem('usuario', JSON.stringify(data));
        console.log("JOEEEEEEEEEE" + data.tipo);
        if(data.tipo === 'admin'){
            irAAdmin();
        }else{
            cambiarDeVentana(); 
        }
    })
    .catch((error) => {
        console.log("Error:", error);
        noSePudo();
    });
}


function irAAdmin(){
    window.location.href = '../admin/admin.html';
}

function noSePudo(){
    const msgErrorInit = document.getElementById('msg-error-inicio'); 
    msgErrorInit.innerHTML = "Usuario o Contraseña Incorrectos"
    msgErrorInit.style.display = "block";
}

function cambiarDeVentana(){
    window.location.href = '../../catalogo/catalogo.html';
}

function esEmailValido(email){
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }