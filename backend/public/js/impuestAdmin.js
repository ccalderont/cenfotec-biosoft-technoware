
    // Espera a que el DOM esté completamente cargado
    document.addEventListener("DOMContentLoaded", function() {
        // Obtener referencia al botón de guardar
        var guardarBtn = document.querySelector('.continue');

        // Agregar un event listener para el click en el botón de guardar
        guardarBtn.addEventListener('click', function() {
            // Obtener el valor ingresado en el input de impuesto
            var impuestoValue = document.querySelector('.impuesto-input').value;
            
            // Verificar si se ingresó un número válido en el input
            if (!isNaN(impuestoValue) && impuestoValue !== '') {
                // Mostrar una alerta indicando que el impuesto se ha actualizado
                alert('¡El impuesto se ha actualizado!');
            } else {
                // Si el valor ingresado no es un número válido, mostrar un mensaje de error
                alert('Por favor, ingrese un número válido para el impuesto.');
            }
        });
    });
