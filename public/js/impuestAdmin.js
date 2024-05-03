if (localStorage.getItem('tipoUsuario') !== 'admin'){
    window.location.href = '/';
}

loadPage();

async function loadPage() {
    await setTax();
}

async function setTax(){
    var impuesto = await getTax();
    document.querySelector('#impuesto-input').value = impuesto;
}

async function getTax(){
    var response = await fetch('/getImpuestoAdmin');
    var data = await response.json();
    return data.impuesto;
}

// Funcion para el click en el botón de guardar
async function updateTax(){
    // Obtener el valor ingresado en el input de impuesto
    var impuestoValue = document.querySelector('#impuesto-input').value;
    
    // Verificar si se ingresó un número válido en el input
    if (!isNaN(impuestoValue) && impuestoValue !== '') {
        await updateImpuestoAdmin(impuestoValue);
        return;
    } 
    
    // Si el valor ingresado no es un número válido, mostrar un mensaje de error
    alert('Por favor, ingrese un número válido para el impuesto.');
    
}


async function updateImpuestoAdmin(impuestoValue){
    var response = await fetch('/admin/updateImpuestoAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({impuesto: impuestoValue})
    });
    var data = await response.json();
    if(data.message !== 'Impuesto actualizado'){
        alert('Hubo un error al actualizar el impuesto');
        return;
    }
    alert('¡El impuesto se ha actualizado!');
    return;
}