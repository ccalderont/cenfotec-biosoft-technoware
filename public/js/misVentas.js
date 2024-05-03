if (localStorage.getItem('tipoUsuario') !== 'vendedor'){
    window.location.href = '/';
}

loadPage();

/**
 * Set the dynamic information of the page
 */
function loadPage(){
    setDates();
    loadTable();
    
}

function setDates(){
    const today = new Date();
    document.getElementById('date-filter-to').value = today.toISOString().split('T')[0];
    today.setDate(today.getDate() - 30);
    document.getElementById('date-filter-from').value = today.toISOString().split('T')[0];
}

/**
 * Sets the net price of the sells with the admin taxes in the page
 */
function setUpTotalNetPriceWithAdminTaxes(validPurchases){
    const totalPrice = document.getElementById('total-net-with-admin-taxes');
    const total = getTotalNetExpenseWithAdminTaxes(validPurchases);
    totalPrice.innerHTML = `<strong>Total con impuestos de admin:</strong> ₡${total}`
}

/**
 * Returns the total net expense of all the sells with the admins's taxes currently showing in the page
 * @returns 
 */
function getTotalNetExpenseWithAdminTaxes(validPurchases){
    return validPurchases.reduce((acc, purchase) => acc + purchase.precioConImpuestoAdmin, 0);
}

/**
 * Sets the net price of the sells with the vendor taxes in the page
 */
function setUpTotalNetPriceWithVendorTaxes(validPurchases){
    const totalPrice = document.getElementById('total-net-with-my-taxes');
    const total = getTotalNetExpenseWithVendorTaxes(validPurchases);
    totalPrice.innerHTML = `<strong>Total con mis impuestos:</strong> ₡${total}`
}

/**
 * Returns the total net expense of all the sells with the vendor's taxes currently showing in the page
 * @returns 
 */
function getTotalNetExpenseWithVendorTaxes(validPurchases){
    return validPurchases.reduce((acc, purchase) => acc + purchase.precioSinImpuestoAdmin, 0);
}


/**
 * Loads the table with the sells information
 */
async function loadTable(){
    const data = await getSells();
    const table = document.getElementById('sells-tbody');
    table.innerHTML = '';
    const validPurchases = [];
    data.ventas.forEach(sell => {
        sell.productos.forEach(compra => {
            // A sell can have products from different stores
            // Skip the embedded documents from the sell that are not from the current store
            if(compra.tramo._id === data.tramo){
                const row = createRow(sell, compra);
                table.appendChild(row);
                validPurchases.push(compra);
            }
        });
    });
    setUpTotalNetPriceWithVendorTaxes(validPurchases);
    setUpTotalNetPriceWithAdminTaxes(validPurchases);
}


async function getSells(){
    const result = await fetch('/vendedor/obtenerVentas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: localStorage.getItem('idUsuario'),
            fechaInicio: document.getElementById('date-filter-from').value,
            fechaFin: document.getElementById('date-filter-to').value
        })
    });
    const data = await result.json();
    if(data.message !== 'Ventas encontradas'){
        alert('Hubo un error al conseguir las ventas');
        return [];
    }
    return data;
}

/**
 * Gets the information of the sell and creates a row element with it
 * @param {Object} sell - Object with the information of a sell
 * @param {Object} compra - Embeded document with the information of the product bought
 * @returns {HTMLElement} - Row element with the information of the sell
 */
function createRow(sell, compra){
    let date = new Date(sell.fecha);
    let formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const row = document.createElement('tr');
    row.innerHTML = `
        <tr>
            <td>${formattedDate}</td>
            <td>${compra.producto.nombre}</td>
            <td>${compra.cantidad} ${compra.producto.unidadMedida}</td>
            <td>${sell.usuario.nombre} ${sell.usuario.apellidos}</td>
            <td>₡ ${compra.precioSinImpuestoAdmin}</td>
            <td>₡ ${compra.precioConImpuestoAdmin}</td>
            ${(compra.resena) ?
                `<td class="centered-td"
                data-purchaseid="${sell.id}"
                data-productname="${compra.producto.nombre}"
                data-reviewid="${compra.resena._id}"
                data-stars="${compra.resena.calificacion}"
                data-comment="${compra.resena.comentario}"
                onclick=showModal(this)>
                    <i class="fa-solid fa-list-check"></i>
                </td>`
            : 
                `<td></td>`
            }
        </tr>
    `
    return row;
}

/**
 * Closes the modal to add to the cart
 */
function closeModal(event){
    if (event.target.id === "modal") {
        let modal = document.getElementById('modal');
        // If it was, hide the modal
        modal.style.display = 'none';
    }
    
}

/**
 * Prepares and shows the modal for the review selected
 * @param {HTMLElement} target - Cell clicked with the information to load in the modal
 */

function showModal(target) {
    loadSubmittedReviewModal(target);    
    displayModalInView();
    
}

/**
 * Displays the modal in the view
 */
function displayModalInView(){
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
}

/**
 * Loads the elements for a submitted review in the modal
 * @param {HTMLElement} target - Cell clicked with the information to load in the modal
 */
function loadSubmittedReviewModal(target){
    let stars = target.getAttribute('data-stars');
    const star = document.getElementById(`stars-submitted`);
    star.style.color = 'gold';
    star.innerText = '';
    for(let i = 1; i <= stars; i++){
        star.innerText += '★';
    }
    document.getElementById('review-comment-submitted').innerText = target.getAttribute('data-comment');
    document.getElementById('modal-product-name').innerHTML = target.getAttribute('data-productname');
}

