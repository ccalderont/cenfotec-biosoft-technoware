if (localStorage.getItem('tipoUsuario') !== 'cliente'){
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
 * Sets the total price of the purchases in the page
 */
function setUpTotalPrice(purchases){
    const totalPrice = document.getElementById('total-price');
    const total = getTotalExpense(purchases);
    totalPrice.innerHTML = `<strong>Total pagado:</strong> ₡${total}`;
}

/**
 * Returns the total expense of all the purchases currently showing in the page
 * @returns {number} - Total expense of all the purchases
 */
function getTotalExpense(purchases){
    return purchases.reduce((acc, purchase) => acc + purchase.precioTotalConImpuestoAdmin, 0);
}

/**
 * Loads the table with the purchases information
 */
async function loadTable(){
    const purchases = await getPurchases();
    if(!purchases) return;
    const table = document.getElementById('purchases-tbody');
    table.innerHTML = '';
    purchases.forEach(purchase => {
        const row = createRow(purchase);
        table.appendChild(row);
    });
    setUpTotalPrice(purchases);
}

async function getPurchases(){
    const result = await fetch('/cliente/obtenerCompras', {
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
    return data.compras;
}

/**
 * Gets the information of the purchase and creates a row element with it
 * @param {Object} purchase - Object with the information of a purchase 
 * @returns {HTMLElement} - Row element with the information of the purchase
 */
function createRow(purchase){
    const row = document.createElement('tr');
    let date = new Date(purchase.fecha);
    let formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    row.innerHTML = `
        <td class="centered-td">${formattedDate}</td>
        <td id="center-cell-${purchase._id}" class="main-table-center-td">
            <section class="general-section">
                <table class="general-info-table">
                    <tbody>
                        ${purchase.productos.map(product => `
                            <tr>
                                <td>${product.producto.nombre} - ${product.cantidad} ${product.producto.unidadMedida} </td>
                                <td>₡${product.precioConImpuestoAdmin}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <button
                    class="show-details-button details-button"
                    data-sellid = '${purchase._id}'
                    onclick="showHideDetails(this)">Detalles <i class="fa-solid fa-eye"></i></button>
            </section>
            <section class="details-section hidden-element">
                <button 
                    class="hide-details-button details-button "
                    data-sellid = '${purchase._id}'
                    onclick="showHideDetails(this)">Ocultar <i class="fa-solid fa-eye-slash"></i></button>
                <table class="details-table">
                    <thead>
                        <th>Producto</th>
                        <th>Tramo</th>
                        <th>Cantidad</th>
                        <th>Precio bruto</th>
                        <th>Precio neto</th>
                        <th>Reseña</th>
                    </thead>
                    <tbody>
                        ${purchase.productos.map(product => `
                            <tr>
                                <td>${product.producto.nombre}</td>
                                <td>${product.tramo.nombre}</td>
                                <td>${product.cantidad} ${product.producto.unidadMedida}</td>
                                <td>₡${product.precioSinImpuestoAdmin}</td>
                                <td>₡${product.precioConImpuestoAdmin}</td>
                                ${(product.resena) ?
                                    `<td class="centered-td review-filled"
                                    data-sellid="${purchase._id}"
                                    data-purchaseid="${product._id}"
                                    data-productid="${product.producto._id}"
                                    data-productname="${product.producto.nombre}"
                                    data-store="${product.tramo.nombre}"
                                    data-storeid="${product.tramo._id}"
                                    data-reviewid="${product.resena._id}"
                                    data-stars="${product.resena.calificacion}"
                                    data-comment="${product.resena.comentario}"
                                    onclick=showModal(this)>
                                        <i class="fa-solid fa-list-check"></i>
                                    </td>`
                                : 
                                    `<td class="centered-td"
                                        data-sellid="${purchase._id}"
                                        data-purchaseid="${product._id}"
                                        data-productname="${product.producto.nombre}"
                                        data-productid="${product.producto._id}"
                                        data-store="${product.tramo.nombre}"
                                        data-storeid="${product.tramo._id}"
                                        onclick=showModal(this)>
                                            <i class="fa-solid fa-list"></i>
                                    </td>`
                                }
                                
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </section>

        </td>
        <td class="centered-td">₡${purchase.precioTotalConImpuestoAdmin}</td>
    `
    return row;
}

/**
 * Hides or shows the details table of each sell depending on the button clicked
 * @param {HTMLElementEventMap} target - Button clicked on the table
 */
function showHideDetails(target){
    const centerCell = getCenterCell(target);
    if(buttonIsShowDetails(target)) 
        showDetails(centerCell);
    else
        hideDetails(centerCell);
}

/**
 * Gets the parent cell of the button clicked
 * @param {HTMLElementEventMap} button - Button clicked in the cell
 * @returns {HTMLElement} - Parent cell that contains the clicked button
 */
function getCenterCell(button){
    const sellId = button.dataset.sellid;
    const centerCellId = `center-cell-${sellId}`;
    return document.getElementById(centerCellId);
}

/**
 * Returns a boolean informing if the button clicked is for showing the details table
 * @param {HTMLElement} button - Button clicked, it can be to show or hide details
 * @returns 
 */
function buttonIsShowDetails(button){
    return button.classList.contains('show-details-button');
}

/**
 * Shows the details table for a sell
 * @param {HTMLElement} parentCell - Parent cell containing the details to show
 */
function showDetails(parentCell){
    const generalSection = parentCell.getElementsByClassName('general-section')[0];
    const detailsSection = parentCell.getElementsByClassName('details-section')[0];

    generalSection.classList.add('hidden-element');
    detailsSection.classList.remove('hidden-element');
}

/**
 * Hides the details table for a sell
 * @param {HTMLElement} parentCell - Parent cell containing the details to hide
 */
function hideDetails(parentCell){
    const generalSection = parentCell.getElementsByClassName('general-section')[0];
    const detailsSection = parentCell.getElementsByClassName('details-section')[0];

    generalSection.classList.remove('hidden-element');
    detailsSection.classList.add('hidden-element');   
}

/**
 * Prepares and shows the modal for the review (pending or submitted)
 * @param {HTMLElement} target - Cell clicked with the information to load in the modal
 */

function showModal(target) {
    loadPendingReviewModal(target);
    
    if(isReviewSubmitted(target)){
        loadSubmittedReviewModal(target);
    }
    
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
    document.getElementsByClassName('modal-pending-evaluation')[0].classList.add('hidden-element');
    document.getElementsByClassName('modal-submitted-evaluation')[0].classList.remove('hidden-element');
    let stars = target.getAttribute('data-stars');
    const star = document.getElementById(`stars-submitted`);
    star.style.color = 'gold';
    star.innerText = '';
    for(let i = 1; i <= stars; i++){
        star.innerText += '★';
    }
    document.getElementById('delete-review-button').dataset.reviewid = target.getAttribute('data-reviewid');
    document.getElementById('review-comment-submitted').innerText = target.getAttribute('data-comment');
}

/**
 * Confirms if the review is submitted or not
 * @param {HTMLElement} target 
 * @returns {boolean} - True if the review is submitted, false otherwise
 */
function isReviewSubmitted(target){
    return target.classList.contains('review-filled');
}

/**
 * Loads the elements for a pending review in the modal
 * @param {HTMLElement} target - Cell clicked with the information to load in the modal
 */
function loadPendingReviewModal(target){
    document.getElementsByClassName('modal-pending-evaluation')[0].classList.remove('hidden-element');
    document.getElementsByClassName('modal-submitted-evaluation')[0].classList.add('hidden-element');
    document.getElementById('hidden-sell-id').value = target.getAttribute('data-sellid');
    document.getElementById('hidden-review-id').value = target.getAttribute('data-reviewid');
    document.getElementById('hidden-product-id').value = target.getAttribute('data-productid');
    document.getElementById('hidden-store-id').value = target.getAttribute('data-storeid');
    document.getElementById('hidden-purchase-id').value = target.getAttribute('data-purchaseid');
    document.getElementById('modal-product-name').innerHTML = target.getAttribute('data-productname');
    document.getElementById('modal-product-store').innerHTML = "<strong>Tramo:</strong> " + target.getAttribute('data-store');
}

/**
 * Adds the review to the product
 */
async function addReview(){
    const stars = document.getElementsByClassName('star-selected').length;
    const comment = document.getElementById('review-comment').value;
    const result = await fetch('/cliente/agregarResena', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: localStorage.getItem('idUsuario'),
            producto: document.getElementById('hidden-product-id').value,
            tramo: document.getElementById('hidden-store-id').value,
            compra: document.getElementById('hidden-purchase-id').value,
            venta: document.getElementById('hidden-sell-id').value,
            calificacion: stars,
            comentario: comment
        })
    });
    const data = await result.json();
    if(data.message === 'Reseña agregada'){
        alert('Reseña agregada con éxito');
        window.location.reload();
        return;
    }
    alert('Error al agregar la reseña');
}

/**
 * Deletes the review of the product
 * @param {HTMLElement} target - Delete button with the id of the review to delete
 */
async function deleteReview(){
    const result = await fetch('/cliente/eliminarResena', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            producto: document.getElementById('hidden-product-id').value,
            tramo: document.getElementById('hidden-store-id').value,
            compra: document.getElementById('hidden-purchase-id').value,
            venta: document.getElementById('hidden-sell-id').value,
            resena: document.getElementById('hidden-review-id').value
        })
    });
    const data = await result.json();
    if(data.message === 'Reseña eliminada'){
        alert('Reseña eliminada con éxito');
        window.location.reload();
        return;
    }
    alert('Error al eliminar la reseña');
}

/**
 * Closes the modal to add to the cart
 */
function closeModal(event){
    if (event.target.id === "modal") {
        let modal = document.getElementById('modal');
        // If it was, hide the modal
        modal.style.display = 'none';
        resetReviewForm();
    }
    
}

/**
 * Resets the review form to its default values
 */
function resetReviewForm(){
    resetReviewComment();
    resetAllStars();
}

/**
 * Resets the review comment from the form to its default value
 */
function resetReviewComment(){
    const reviewComment = document.getElementById('review-comment');
    reviewComment.value = '';
}

/**
 * Resets the stars from the form to their default value
 */
function resetAllStars(){
    for (let i = 2; i <= 5; i++){
        const star = document.getElementById(`star-${i}`);
        star.innerText = '';
        star.classList.add('star-unselected');
        star.classList.remove('star-selected');
    }

}

/**
 * Called when hovering over a star, so it changes all the stars previous to it
 * @param {int} starNumber - Number of the star that is being hovered
 */
function overStar(starNumber){
    for (let i = 1; i <= starNumber; i++){
        const star = document.getElementById(`star-${i}`);
        if(star.classList.contains('star-selected')) continue;
        star.innerText = '★';
        star.style.color = 'gold';
        star.classList.remove('star-unselected');
    }
}

/**
 * Called when the mouse leaves a star, so it resets all the stars that were not previously selected
 */
function resetStars(){
    for (let i = 1; i <= 5; i++){
        const star = document.getElementById(`star-${i}`);
        if(star.classList.contains('star-selected')) continue;
        star.innerText = '';
        star.classList.add('star-unselected');
    }
}

/**
 * Called when a star is clicked, so it selects the star and deselects the rest
 * @param {int} starNumber - Number of the star that was clicked
 */
function selectStar(starNumber){
    for (let i = 1; i <= starNumber; i++){
        const star = document.getElementById(`star-${i}`);
        star.innerText = '';
        star.classList.remove('star-unselected');
        star.classList.add('star-selected');
    }
    for (let i = starNumber + 1; i <= 5; i++){
        const star = document.getElementById(`star-${i}`);
        star.innerText = '';
        star.classList.remove('star-selected');
        star.classList.add('star-unselected');
    }
}

