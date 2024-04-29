let impuestoAdmin = 0;
/**
 * Set the dynamic information of the page
 */
async function loadPage(){
    impuestoAdmin = await getAdminTax();
    await loadStoresTable();
    await loadProductsTable();
}

async function getAdminTax(){
    const response = await fetch('/getImpuestoAdmin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data.impuesto;
}

/**
 * Loads the table with the stores information
 */
async function loadStoresTable(){
    const table = document.getElementById('stores-tbody');
    const stores = await getStores();
    stores.forEach(store => {
        const row = createStoreRow(store);
        table.appendChild(row);
    });
}

async function getStores(){
    const response = await fetch('/admin/getTramosPendientes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data.stores;
}

/**
 * Gets the information of the store and creates a row element with it
 * @param {Object} store - Object with the information of a store 
 * @returns {HTMLElement} - Row element with the information of the store
 */
function createStoreRow(store){
    const row = document.createElement('tr');
    const date = new Date(store.fecha);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    row.innerHTML = `
        <tr>
            <td class="text-cell">${formattedDate}</td>
            <td class="text-cell">${store.nombre}</td>
            <td class="description-cell">${store.descripcion}</td>
            <td class="text-cell">${store.usuario}</td>
            <td class="text-cell">${store.direccion}</td>
            <td class='centered-td'><a href=${store.permisos} download target="_blank"><i class="fa-solid fa-download"></i></a></td>
            <td class='centered-td'>
                <button 
                    class='accept-button'
                    onclick=approveStore("${store.id}")>
                        Aprobar
                </button>
                <button 
                    class='reject-button'
                    onclick=rejectStore(${store.id})>
                        Recharzar
                </button>
            </td>
        </tr>
    `
    return row;
}

async function approveProduct(productId){
    const confirmation = confirm('¿Está seguro de aprobar esta solicitud?');
    if(!confirmation) return;
    const response = await fetch('/admin/aprobarProducto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({producto: productId})
    });
    const data = await response.json();
    if(data.message === 'Producto aprobado con éxito'){
        alert('Solicitud aprobada con éxito');
        location.reload();
        return;
    }

    alert('Hubo un error al aprobar la solicitud');

}

async function approveStore(storeId){
    const confirmation = confirm('¿Está seguro de aprobar esta solicitud?');
    if(!confirmation) return;
    const response = await fetch('/admin/aprobarTramo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({tramo: storeId})
    });
    const data = await response.json();
    if(data.message === 'Tramo aprobado con éxito'){
        alert('Solicitud aprobada con éxito');
        location.reload();
        return;
    }

    alert('Hubo un error al aprobar la solicitud');
}

/**
 * Loads the table with the stores information
 */
async function loadProductsTable(){
    const table = document.getElementById('products-tbody');
    const products = await getProducts();
    products.forEach(product => {
        const row = createProductRow(product);
        table.appendChild(row);
    });
}

async function getProducts(){
    const response = await fetch('/admin/getProductosPendientes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data.products;
}

/**
 * Gets the information of the product and creates a row element with it
 * @param {Object} product - Object with the information of a product 
 * @returns {HTMLElement} - Row element with the information of the product
 */
function createProductRow(product){
    const row = document.createElement('tr');
    const date = new Date(product.fecha);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    row.innerHTML = `
        <tr>
            <td class="text-cell">${formattedDate}</td>
            <td class="text-cell">${product.nombre}</td>
            <td><img class='product-img' src='${product.foto}'></td>
            <td class="description-cell">${product.descripcion}</td>
            <td class="text-cell">${product.categoria}</td>
            <td class="text-cell">${product.unidadMedida}</td>
            <td class="text-cell">${product.tramo}</td>
            <td>₡${product.precioBruto}</td>
            <td>${product.impuesto}%</td>
            <td>₡${getPriceWithoutAdminTax(product.precioBruto, product.impuesto)}</td>
            <td>₡${getPriceWithAdminTax(product.precioBruto, product.impuesto)}</td>
            <td class='centered-td'>
            <button 
                class='accept-button'
                onclick=approveProduct("${product.id}")>
                    Aprobar
            </button>
            <button 
                class='reject-button'
                onclick=rejectProduct(${product.id})>
                    Recharzar
            </button>
            </td>
        </tr>
    `
    return row;
}

function getPriceWithoutAdminTax(price, tax){
    return price + (price * tax / 100);
}

function getPriceWithAdminTax(price, tax){
    return price + (price * (tax + impuestoAdmin) / 100);
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
    if(target.dataset.action === 'accept'){
        loadAcceptModal(target);    
    } else {
        loadRejectModal(target);
    }
    displayModalInView();
}

function loadAcceptModal(target){
    let modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <div class="modal-header">
            <h3>¿Está seguro de aceptar esta solicitud?</h3>
        </div>
        <div class="modal-body">
            <p>Al aceptar esta solicitud, se realizarán los cambios correspondientes en la base de datos</p>
        </div>
        <div class="modal-footer">
            <button class="accept-button" onclick=acceptRequest(this) data-table=${target.dataset.table}>Aceptar</button>
            <button class="reject-button" onclick=closeModal(event)>Cancelar</button>
        </div>
    `
}

function loadRejectModal(target){
    let modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <div class="modal-header">
            <h3>¿Está seguro de rechazar esta solicitud?</h3>
        </div>
        <div class="modal-body">
            <p>Al rechazar esta solicitud, se realizarán los cambios correspondientes en la base de datos</p>
            <textarea id="rejection-reason" cols=40 rows=8 placeholder="Razón de rechazo"></textarea>
        </div>
        <div class="modal-footer">
            <button class="accept-button" onclick=rejectRequest(this) data-table=${target.dataset.table}>Aceptar</button>
            <button class="add-category-button" onclick=closeModal(event)>Cancelar</button>
        </div>
    `
}

/**
 * Displays the modal in the view
 */
function displayModalInView(){
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
}

loadPage();