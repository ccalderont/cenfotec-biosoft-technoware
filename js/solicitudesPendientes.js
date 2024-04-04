/**
 * Set the dynamic information of the page
 */
function loadPage(){
    loadStoresTable();
    loadProductsTable();
}

/**
 * Loads the table with the stores information
 */
function loadStoresTable(){
    const table = document.getElementById('stores-tbody');
    stores.forEach(store => {
        const row = createStoreRow(store);
        table.appendChild(row);
    });
}

/**
 * Gets the information of the store and creates a row element with it
 * @param {Object} store - Object with the information of a store 
 * @returns {HTMLElement} - Row element with the information of the store
 */
function createStoreRow(store){
    const row = document.createElement('tr');
    row.innerHTML = `
        <tr>
            <td class="text-cell">${store.date}</td>
            <td class="text-cell">${store.name}</td>
            <td class="description-cell">${store.description}</td>
            <td class="text-cell">${store.id_user}</td>
            <td class="text-cell">${store.address}</td>
            <td class='centered-td'><a href=${store.permission} download><i class="fa-solid fa-download"></i></a></td>
            <td class='centered-td'>
                <span 
                    onclick=showModal(this) 
                    data-action='accept'
                    data-table='store'>
                        <i class="fa-solid fa-square-check accept-button"></i>
                </span>
                <span
                    onclick=showModal(this)
                    data-action='reject'
                    data-table='store'>
                        <i class="fa-solid fa-rectangle-xmark reject-button"></i>
                </span>
            </td>
        </tr>
    `
    return row;
}


/**
 * Loads the table with the stores information
 */
function loadProductsTable(){
    const table = document.getElementById('products-tbody');
    products.forEach(product => {
        const row = createProductRow(product);
        table.appendChild(row);
    });
}

/**
 * Gets the information of the product and creates a row element with it
 * @param {Object} product - Object with the information of a product 
 * @returns {HTMLElement} - Row element with the information of the product
 */
function createProductRow(product){
    const row = document.createElement('tr');
    row.innerHTML = `
        <tr>
            <td class="text-cell">${product.date}</td>
            <td class="text-cell">${product.name}</td>
            <td><img class='product-img' src='${product.picture}'></td>
            <td class="description-cell">${product.description}</td>
            <td class="text-cell">${product.category}</td>
            <td class="text-cell">${product.unit}</td>
            <td class="text-cell">${product.store_id}</td>
            <td>₡${product.brute_price}</td>
            <td>${product.store_tax}%</td>
            <td>₡${product.price_with_store_tax}</td>
            <td>₡${product.price_with_admin_tax}</td>
            <td class='centered-td'>
                <span 
                    onclick=showModal(this) 
                    data-action='accept'
                    data-table='product'>
                        <i class="fa-solid fa-square-check accept-button"></i>
                </span>
                <span 
                    onclick=showModal(this) 
                    data-action='reject'
                    data-table='product'>
                        <i class="fa-solid fa-rectangle-xmark reject-button"></i>
                </span>
            </td>
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
            <h2>¿Está seguro de aceptar esta solicitud?</h2>
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
            <h2>¿Está seguro de rechazar esta solicitud?</h2>
        </div>
        <div class="modal-body">
            <p>Al rechazar esta solicitud, se realizarán los cambios correspondientes en la base de datos</p>
            <textarea id="rejection-reason" cols=35 rows=8 placeholder="Razón de rechazo"></textarea>
        </div>
        <div class="modal-footer">
            <button class="accept-button" onclick=rejectRequest(this) data-table=${target.dataset.table}>Aceptar</button>
            <button class="reject-button" onclick=closeModal(event)>Cancelar</button>
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



const stores= [
    {
        id: 1,
        date: '2021-10-10',
        name: 'Las Manzanitas de Doña Rosa',
        description: 'El lugar con las manzanas más frescas y deliciosas',
        id_user: 'Jose Fernandez',
        address: 'San Ramón, Alajuela',
        permission: '../resources/extra/permission.pdf',
    },
];

const products= [
    {
        id: 1,
        date: '2021-10-10',
        name: 'Manzanas',
        picture: 'https://i0.wp.com/www.buenmercadoacasa.com/blog/wp-content/uploads/2018/05/variedades-de-manzanas-buenmercadoacasa-portada.jpg?fit=2880%2C1800&ssl=1',
        description: 'las manzanas rojas mas deliciosas de alajuela que no se comparan con ninguna otra que hayas probado nunca jamas de los jamases es que en serio son demasiado ricas, y demasiado rojas y dulces',
        category: 'Frutas',
        unit: 'kgs',
        store_id: 'Mi Tierra Linda',
        user_id: 'Jose Fernandez',
        brute_price: 500,
        store_tax: 10,
        price_with_store_tax: 550,
        price_with_admin_tax: 600,
    },
];

loadPage();