function validarCorreo() {
    // Obtener el valor del correo electrónico ingresado por el usuario
    var correo = document.getElementById('email').value;
    
    // Validar si el correo electrónico está presente y contiene el carácter "@"
    if (correo.trim() !== '') {
        if (correo.includes('@')) {
            // Mostrar alerta con mensaje personalizado
            alert('Se ha enviado un correo para restablecer tu contraseña. Por favor, revisa la bandeja de entrada.');
        } else {
            // Si el correo electrónico no contiene "@", mostrar mensaje de error
            alert('Por favor, ingresa un correo electrónico válido.');
        }
        // Eliminar el event listener después de hacer clic en el botón
        document.querySelector('.send-button').removeEventListener('click', validarCorreo);
    } else {
        // Si el correo electrónico está vacío, mostrar mensaje de error
        alert('Por favor, ingresa tu correo electrónico.');
    }
}

// Agregar event listener al botón "Enviar"
document.querySelector('.send-button').addEventListener('click', validarCorreo);
