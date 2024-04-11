
    document.getElementById('productRegister').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe
        validarFormulario();
    });

    function validarFormulario() {
        var productName = document.getElementById('productName').value;
        var quantity = document.getElementById('quantity').value;
        var price = document.getElementById('price').value;
        var tax = document.getElementById('tax').value;
        var productImage = document.getElementById('productImage').value;

        // Verificar si todos los campos están llenos
        if (productName.trim() !== '' && quantity.trim() !== '' && price.trim() !== '' && tax.trim() !== '' && productImage.trim() !== '') {
            // Mostrar la alerta
            alert('¡Producto registrado exitosamente!');
            // Restablecer el formulario después de enviar
            document.getElementById('productRegister').reset();
        } else {
            // Si no todos los campos están llenos, mostrar un mensaje de error
            alert('Por favor, complete todos los campos.');
        }
    }
