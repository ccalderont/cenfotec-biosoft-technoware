document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("password-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
         const newPassword = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        
         if (newPassword === confirmPassword) {
             alert("La contraseña ha sido actualizada exitosamente.");
            
           
        } else {
             alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
        }
    });
});
