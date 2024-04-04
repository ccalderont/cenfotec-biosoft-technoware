const cardHolder = document.getElementById("card-holder")
const cardNumber = document.getElementById("card-number")
const cvc = document.getElementById("security-code")
const expDate = document.getElementById("expiration-date")
const form = document.getElementById("form")
//const msj = document.getElementById("button-enviar")
let openModal = document.getElementById("button-enviar")
let cardModal = document.getElementById("modal")
let closeModal = document.getElementById("close")



function cardHolderVerification() {

    if (cardHolder.value.length < 10 /*|| cardHolder.trim() == ""*/) {
        alert("Nombre: El valor ingresado es inválido (10 caracteres)")
        // document.getElementById("card-holder").style.borderColor = "red";
        return false;
    } else {
        return true;
    }

}


function cardVerification() {

    const cardNumber = document.getElementById("card-number").value;
    const isNumber = /^[0-9]+$/.test(cardNumber);

    if (isNumber && cardNumber.length === 16) {
        // El valor ingresado es un número válido de 16 dígitos
        //alert("Formato correcto")
        return true;
    } else {
        // El valor ingresado no es válido
        alert("Tarjeta: El valor ingresado no es válido, digitar solo números (16 dígitos)")
        //document.getElementById("card-number").style.borderColor = "red";
        return false;
    }
}


function cvcVerification() {

    // valor ingresado es valida (es igual a 3 digitos)
    if (cvc.value.length === 3) {
        return true;
    } else {
        alert(" CVC: Valor ingresado es inválido (3 dígitos)")
        // document.getElementById("security-code").style.borderColor = "red";
        return false;
    }
}



function expirationDateVerification() {

    const expDate = document.getElementById("expiration-date").value;
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (regex.test(expDate)) {
        // El valor ingresado es una fecha válida (mayor a fecha actual)
        //alert("Valid thru: Fecha valida")
        return true;
    } else {
        // El valor ingresado no es válido (fecha menor a la actual)
        alert("Valid thru: Valor no es válido, fecha expirada o errónea")
        // document.getElementById("expiration-date").style.borderColor = "red";
        return false;
    }
}


// open modal

openModal.onclick = function () {
    cardModal.style.visibility = "visible";
}

// close modal

closeModal.onclick = function () {
    cardModal.style.visibility = "hidden";
}

// close window modal

cardModal.onclick = function () {
    cardModal.style.visibility = "hidden";
}




form.addEventListener('submit', function (event) {
    event.preventDefault(); // Previene el envío del formulario

    // Llama a las funciones de validación
    const isCardHolderValid = cardHolderVerification();
    const isCardNumberValid = cardVerification();
    const isCvcValid = cvcVerification();
    const isExpDateValid = expirationDateVerification();

    // Si todas las validaciones son correctas, muestra el modal
    if (isCardHolderValid && isCardNumberValid && isCvcValid && isExpDateValid) {
        cardModal.style.display = 'block';
    }
});

// Para cerrar el modal
closeModal.addEventListener('click', function () {
    cardModal.style.display = 'none';
    form.reset();
});















/*form.addEventListener("submit", e => {
    e.preventDefault();
    e.stopPropagation();

    if (cardHolderVerification() === true && cardVerification() === true && cvcVerification() === true && expirationDateVerification() === true); {
        openModal();
    }
    else{
        closeModal();
    }
})*/


/*function showConfirm() {
    e.preventDefault()
    const msj = "¿Estás seguro de continuar?";
    const option = confirm(msj);

    if (option) {
        // El usuario hizo clic en "Aceptar"
        alert("Registro de tarjeta exitoso!");
        setTimeout // Crear time out para pasarme a la otra pagina 
    } else {
        // El usuario hizo clic en "Cancelar"
        alert("Acción cancelada.");
    }
}*/





