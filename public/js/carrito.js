initializePage();

async function generarTabla() {
    const response = await fetch('/cliente/obtenerCarrito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: localStorage.getItem('idUsuario')
        })
    });

    const data = await response.json();
    if (data.message !== 'Carrito encontrado') {
        return;
    }

    const productos = data.carrito.productos;
    const tablaBody = document.querySelector('tbody');
    const totalElement = document.getElementById("total");


    productos.forEach(individualRequest => {
        const fila = document.createElement('tr');
        fila.dataset.id = individualRequest._id;
        fila.addEventListener('click', selectRow(fila));
        fila.innerHTML = `
            <td>${individualRequest.producto.nombre}</td>
            <td>₡${individualRequest.precioConImpuestoAdmin.toFixed(2)}</td>
            <td>${individualRequest.cantidad}</td>
            <td>₡${individualRequest.precioConImpuestoAdmin.toFixed(2)}</td>
        `;
        tablaBody.appendChild(fila);
    });

    totalElement.textContent = `₡${data.carrito.precioTotalConImpuestoAdmin.toFixed(2)}`;
}

function selectRow(row) {
    return function () {
        row.classList.toggle('selected-row');
    }
}

async function deleteSelected(){
    const selectedRows = document.querySelectorAll('.selected-row');
    const selectedIds = [...selectedRows].map(row => row.dataset.id);
    const result = await fetch('/cliente/eliminarProductoCarrito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: localStorage.getItem('idUsuario'),
            productos: selectedIds
        })
    });
    const data = await result.json();
    if(data.message === 'Producto eliminado del carrito'){
        location.reload();
        return;
    }
    alert('No se pudo eliminar el producto del carrito');
}

async function initializePage(){
    await generarTabla();
    await rellenarTarjetas();
}

function addCard(){
    window.location.href = '/cliente/registroTarjeta';
}

async function deleteCard(){
    const cardSelected = document.getElementById('cards-select').value;
    if(cardSelected === 'no-card'){
        alert('Seleccione una tarjeta para eliminar');
        return;
    }
    const result = await fetch('/cliente/eliminarTarjeta', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: localStorage.getItem('idUsuario'),
            tarjeta: cardSelected
        })
    });

    const data = await result.json();
    if(data.message === 'Tarjeta eliminada'){
        location.reload();
        return;
    }
    alert('No se pudo eliminar la tarjeta');
}

async function rellenarTarjetas() {
    const cardsSelect = document.getElementById('cards-select');
    const response = await fetch('/cliente/obtenerTarjetas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: localStorage.getItem('idUsuario')
        })
    });

    const data = await response.json();
    cardsSelect.innerHTML = '<option value="no-card">-- Seleccione una tarjeta --</option>';
    const cards = data.tarjetas;
    if(!cards) return;
    cards.forEach(card => {
        const option = document.createElement('option');
        option.value = card._id;
        option.textContent = card.tarjetaHabiente + " - " +card.numeroTarjeta;
        cardsSelect.appendChild(option);
    });
}


/**
 * Closes the modal to add to the cart
 */
function closeModal(event) {
    if (event.target.id === "modal") {
        proceedBuy()
    }
}

async function showModal() {
    const tarjetaSeleccionada = document.getElementById('cards-select').value;
    if(!tarjetaSeleccionada || tarjetaSeleccionada === 'no-card') {
        alert('Debe seleccionar una tarjeta para continuar');
        return;
    }
    const cvc = prompt ("Ingrese el CVC de la tarjeta para completar la compra", "");
    if (!cvc || cvc.length !== 3 || isNaN(cvc)) {
        return;
    }
    
    const sellWasSuccessful = await proceedBuy();
    if(!sellWasSuccessful) {
        alert('No se pudo completar la compra');
        return;
    }
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
}

async function proceedBuy() {
    const tarjetaSeleccionada = document.getElementById('cards-select').value;
    const response = await fetch('/cliente/realizarCompra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: localStorage.getItem('idUsuario'),
            tarjeta: tarjetaSeleccionada
        })
    });

    const data = await response.json();
    if(data.message !== 'Compra realizada'){
        alert(data.message)
        return false;
    }
    return true;
}

function goToMisCompras() {
    window.location.href = '/cliente/misCompras';
}

function goToRegisterCards() {
    window.location.href = '/cliente/registroTarjeta';
}
