document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signin-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Resetear errores
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(function (errorMessage) {
            errorMessage.remove();
        });

        //Validacion del formato de foto
        const userPicture = form.querySelector('#user-picture');
        const allowedExtensions = ['jpg'];

        // Check if a file is selected
        if (userPicture.files.length > 0) {
            const fileExtension = userPicture.value.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            displayErrorMessage(userPicture, 'La foto debe ser formato jpg.');
        } else {
        // Borrar mensage anterior si el formato es correcto
        clearErrorMessage(userPicture);
        }
        } else {
        // Borrar mensage anterior si no se elige un archivo
        clearErrorMessage(userPicture);
        }

        // Validacion de identificacion
        const idNumber = form.querySelector('#id-number');
        if (idNumber.value.trim() === '') {
            displayErrorMessage(idNumber, 'Por favor, ingrese el número de identificación.');
        }

        else if (idNumber.value.trim() < 9) {
                displayErrorMessage(idNumber, 'El número de identificación debe tener al menos 9 dígitos.')
        }        

        // Validacion del nombre
        const firstName = form.querySelector('#first-name');
        if (firstName.value.trim() === '') {
            displayErrorMessage(firstName, 'Por favor, ingrese su nombre.');
        }

        // Validacion del apellido
        const lastName1 = form.querySelector('#last-name1');
        if (lastName1.value.trim() === '') {
            displayErrorMessage(lastName1, 'Por favor, ingrese su primer apellido.');
        }

        // Validacion del numero de telefono
        const phoneNumber = form.querySelector('#phone-number');
        const phoneNumberRegex = /^\d{8}$/; // Assuming 8-digit phone numbers
        if (!phoneNumberRegex.test(phoneNumber.value.trim())) {
            displayErrorMessage(phoneNumber, 'Por favor, ingrese un número de teléfono válido.');
        }

        // Validacion del correo
        const email = form.querySelector('#e-mail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            displayErrorMessage(email, 'Por favor, ingrese un correo electrónico válido.');
        }
        
        //Validacion del nombre del tramo
        const storeName = form.querySelector('#store-name');
        if (storeName.value.trim() === '') {
            displayErrorMessage(storeName, 'Por favor, ingrese el nombre del tramo.');
        }        

        //Validacion del documento de permisos municipales
        const permitFile = form.querySelector('#gov-permit');
        if (permitFile.value.trim() === '') {
        displayErrorMessage(permitFile, 'El documento de permisos municipales debe ser formato PDF.');
        } else {
        const allowedExtensions = ['pdf'];
        const fileExtension = permitFile.value.split('.').pop().toLowerCase();
    
        if (!allowedExtensions.includes(fileExtension)) {
        displayErrorMessage(permitFile, 'El archivo debe ser formato PDF.');
        } }      

        // Validacion de terminos y condiciones
        const termsConditions = form.querySelector('#terms-conditions');
        if (!termsConditions.checked) {
            displayErrorMessage(termsConditions, 'Debe aceptar los términos y condiciones.');
        }

        // Si no hay errores, mandar el form y mostrar modal
        if (form.querySelectorAll('.error-message').length === 0) {
            showModal()
            document.getElementById('signin-form').reset(); //esto borra la info previa del form
        }
    });

    // Funcion para errores
    function displayErrorMessage(inputElement, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        inputElement.parentNode.appendChild(errorElement);
    }

    //funcion para borrar error en campos no requeridos
    function clearErrorMessage(inputElement) {
        const errorElement = inputElement.parentElement.querySelector('.error-message');
    
        if (errorElement) {
            errorElement.remove();
        }
    }
});

//Funcion para el modal
function showModal() {
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
}


function closeModal(event){
    if (event.target.id === "modal") {
        let modal = document.getElementById('modal');
        // If it was, hide the modal
        modal.style.display = 'none';
    }
}