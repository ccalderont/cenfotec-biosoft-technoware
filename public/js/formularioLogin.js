document.getElementById('button-continue').addEventListener('click', checkLogin);
clearLoginData();

async function checkLogin(){
    const loginName = document.getElementById('input-id').value;
    const loginPassword = document.getElementById('input-password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            loginName: loginName, 
            password: loginPassword
        }),
    });

    const data = await response.json();
    if(data.message === 'Usuario no encontrado'){
        alert('Usuario no encontrado');
        return;
    }
    if(data.message !== 'Usuario encontrado'){
        alert('Error en el servidor');
        return;
    }

    localStorage.setItem('nombreUsuario', data.nombre + " " + data.apellido);
    localStorage.setItem('cedula', data.cedula);
    localStorage.setItem('idUsuario', data.id);
    localStorage.setItem('emailUsuario', data.email);
    localStorage.setItem('telefonoUsuario', data.telefono);
    localStorage.setItem('fotoUsuario', data.foto);
    localStorage.setItem('tipoUsuario', data.tipoUsuario);

    window.location = '/';
}



function clearLoginData(){
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('cedula');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('emailUsuario');
    localStorage.removeItem('telefonoUsuario');
    localStorage.removeItem('fotoUsuario');
    localStorage.removeItem('tipoUsuario');
}


/**
 * Closes the modal to add to the cart
 */
function closeModal(event){
    if (event.target.id === "modal" || event.target.classList.contains("close-modal")) {
        let modal = document.getElementById('modal');
        // If it was, hide the modal
        modal.style.display = 'none';
    }
}

function showModal() {
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
}

function goToNewAccount(){
    const accountType = document.querySelector('input[name="accountType"]:checked').value;
    if(accountType === 'cliente'){
        window.location.href = '/RegistroCliente';
    }else{
        window.location.href = '/RegistroVendedor';
    }
}

