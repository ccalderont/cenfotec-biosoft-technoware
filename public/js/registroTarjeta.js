const cardHolder = document.getElementById("card-holder")
const cardNumber = document.getElementById("card-number")
const cvc = document.getElementById("security-code")
const monthExpiration = document.getElementById("mes-exp");
const yearExpiration = document.getElementById("anno-exp");
const form = document.getElementById("form")



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


/*function cvcVerification() {

    // valor ingresado es valida (es igual a 3 digitos)
    if (cvc.value.length === 3) {
        return true;
    } else {
        alert(" CVC: Valor ingresado es inválido (3 dígitos)")
        // document.getElementById("security-code").style.borderColor = "red";
        return false;
    }
}*/

function monthExpVerification() {

    if (monthExpiration.value > 0 && monthExpiration.value <= 12) {
        return true;
    } else {
        alert("Mes: El valor debe ser del 1-12")
        return false;
    }
}

function yearExpVerification() {

    if (yearExpiration.value >= 24 && yearExpiration.value <= 80) {
        return true;
    } else {
        alert("Año: El valor debe ser igual o mayor a 24")
    }

}



/*function expirationDateVerification() {  // cambiar por inputs numbers (mes ano )

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
}*/





async function envioTarjeta() {

    // Llama a las funciones de validación
    const isCardHolderValid = cardHolderVerification();
    const isCardNumberValid = cardVerification();
    const isMonthExpirationValid = monthExpVerification();
    const isYearExpirationValid = yearExpVerification();


    // Si todas las validaciones son correctas, muestra el modal
    if (isCardHolderValid && isCardNumberValid && isMonthExpirationValid && isYearExpirationValid) {
        // cardModal.style.display = 'block';
        await addUserPaymentMethod();
        showModal();
    }
};

const idUser = localStorage.getItem('idUsuario');




async function addUserPaymentMethod() {
    const idUser = localStorage.getItem('idUsuario');
    const cardHolder = document.getElementById("card-holder").value;
    const cardNumber = document.getElementById("card-number").value;
    const monthExpiration = document.getElementById("mes-exp").value;
    const yearExpiration = document.getElementById("anno-exp").value;

    const response = await fetch('/cliente/registroTarjeta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idUser: idUser,
            cardHolder: cardHolder,
            cardNumber: cardNumber,
            monthExpiration: monthExpiration,
            yearExpiration: yearExpiration
        }),
    })

    const data = await response.json();
    return data;
};


/**
 * Closes the modal to add to the cart
 */
function closeModal(event) {
    if (event.target.id === "modal") {
        let modal = document.getElementById('modal');
        // If it was, hide the modal
        modal.style.display = 'none';
    }
}

function showModal() {
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
}

function goToCard() {
    window.location.href = '/cliente/carrito';
}