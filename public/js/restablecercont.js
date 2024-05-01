
async function submitForm() {
        const currentPassword = document.getElementById("current-password").value;
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
    
        if (newPassword === confirmPassword) {
            // Regex para vocales
            const vowelRegex = /[aeiouAEIOU]/;

            if (newPassword.trim() === '') {
                alert('Por favor, ingrese una contraseña.');
                return;
            } else if (vowelRegex.test(newPassword)) {
                alert('La contraseña no debe contener vocales.');
                return;
            } 
            // Validacion del criterio de la contraseña
            const passwordMainRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()-_=+{};:,<.>])(?![aeiouAEIOU]).{8,}$/;
            if (!passwordMainRegex.test(newPassword.trim())) {
                alert('Verifique el criterio para la creación de contraseña.');
                return;
            }

            if(currentPassword.trim() === '') {
                alert('Por favor, ingrese su contraseña actual.');
                return;
            }
            if(currentPassword.trim() === newPassword.trim()) {
                alert('La nueva contraseña no puede ser igual a la actual.');
                return;
            }

            const message = await changePassword();
            if (message === 'Contraseña incorrecta') {
                alert('La contraseña actual es incorrecta.');
                return;
            }
            if(message !== 'Contraseña actualizada'){
                alert('Error en el servidor. Inténtelo de nuevo.');
                return;
            }
            alert("La contraseña ha sido actualizada exitosamente.");
        
        
    } else {
            alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
    }
}

async function changePassword(){
    const userId = localStorage.getItem('idUsuario');
    const newPassword = document.getElementById("new-password").value.trim();
    const oldPassword = document.getElementById("current-password").value.trim();
    const result = await fetch(`/cambiarPassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: userId, newPassword: newPassword, oldPassword: oldPassword})
    });
    const data = await result.json();
    return data.message;
}
