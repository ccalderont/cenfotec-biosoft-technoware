async function validarIdentificacion() {
    // Obtener el valor de la identificación ingresado por el usuario
    var identificacion = document.getElementById('identificacion-input').value;
    
    // Validar si la identificación está presente
    if (identificacion.trim() !== '') {
        // Si la identificación no está vacía, enviar el correo
        const idEncontrado = await sendEmail(identificacion);
        if (idEncontrado) {
            alert('Se ha enviado un correo a tu dirección de correo electrónico.');
        } else {
            alert('La identificación ingresada no existe en la base de datos.');
        }
    } else {
        // Si la identificación está vacía, mostrar mensaje de error
        alert('Por favor, ingresa tu correo electrónico.');
    }
}

async function sendEmail(identificacion) {
    const result = await fetch('/enviarCorreoPassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identificacion: identificacion })
    });
    const data = await result.json();
    return data.message === 'Correo enviado';
}


