/**
 * Set the dynamic information of the page
 */
function loadPage(){
    loadTable();
    setUpTotalPrice();
}

/**
 * Sets the total price of the purchases in the page
 */
function setUpTotalPrice(){
    const totalPrice = document.getElementById('total-price');
    const total = getTotalExpense();
    totalPrice.innerText = `Total expense for timeframe provided: ₡${total}`;
}

/**
 * Returns the total expense of all the purchases currently showing in the page
 * @returns {number} - Total expense of all the purchases
 */
function getTotalExpense(){
    return purchases.reduce((acc, purchase) => acc + purchase.total, 0);
}

/**
 * Loads the table with the purchases information
 */
function loadTable(){
    const table = document.getElementById('purchases-tbody');
    purchases.forEach(purchase => {
        const row = createRow(purchase);
        table.appendChild(row);
    });
}

/**
 * Gets the information of the purchase and creates a row element with it
 * @param {Object} purchase - Object with the information of a purchase 
 * @returns {HTMLElement} - Row element with the information of the purchase
 */
function createRow(purchase){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="centered-td">${purchase.date}</td>
        <td id="center-cell-${purchase.id}" class="main-table-center-td">
            <section class="general-section">
                <table class="general-info-table">
                    <tbody>
                        ${purchase.products.map(product => `
                            <tr>
                                <td>${product.name}</td>
                                <td>₡${product.net_price}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <button
                    class="show-details-button details-button"
                    data-sellid = '${purchase.id}'
                    onclick="showHideDetails(this)">Detalles <i class="fa-solid fa-eye"></i></button>
            </section>
            <section class="details-section hidden-element">
                <button 
                    class="hide-details-button details-button "
                    data-sellid = '${purchase.id}'
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
                        ${purchase.products.map(product => `
                            <tr>
                                <td>${product.name}</td>
                                <td>${product.store}</td>
                                <td>${product.quantity} ${product.unit}</td>
                                <td>₡${product.net_price}</td>
                                <td>₡${product.brute_price}</td>
                                ${(product.review) ?
                                    `<td class="centered-td review-filled"
                                    data-purchaseid="${purchase.id}"
                                    data-productid="${product.id}"
                                    data-productname="${product.name}"
                                    data-store="${product.store}"
                                    data-reviewid="${product.review.id}"
                                    data-stars="${product.review.stars}"
                                    data-comment="${product.review.comment}"
                                    onclick=showModal(this)>
                                        <i class="fa-solid fa-list-check"></i>
                                    </td>`
                                : 
                                    `<td class="centered-td"
                                        data-purchaseid="${purchase.id}"
                                        data-productname="${product.name}"
                                        data-productid="${product.id}"
                                        data-store="${product.store}"
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
        <td class="centered-td">₡${purchase.total}</td>
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
    document.getElementById('modal-product-name').innerHTML = target.getAttribute('data-productname');
    document.getElementById('modal-product-store').innerHTML = "<strong>Tramo:</strong> " + target.getAttribute('data-store');
}

/**
 * Adds the review to the product
 */
function addReview(){
    const stars = document.getElementsByClassName('star-selected').length;
    const comment = document.getElementById('review-comment').value;
    alert('Reseña agregada con éxito');
    window.location.reload();
}

/**
 * Deletes the review of the product
 * @param {HTMLElement} target - Delete button with the id of the review to delete
 */
function deleteReview(target){
    alert('Reseña eliminada con éxito');
    window.location.reload();
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



const purchases= [
    {
        id: 1,
        date: '2021-10-10',
        total: 550,
        products: [
            {
                id: 1,
                name: 'Manzanas',
                store: 'Mi Tierra',
                quantity: 2,
                unit: 'kg',
                net_price: 50,
                brute_price: 45,
                review: {
                    id: 1,
                    stars: 4,
                    comment: 'Muy buenas manzanas'
                }
            },
            {
                id: 2,
                name: 'Leche',
                store: 'Tienda Don Pepe',
                quantity: 1,
                unit: 'caja',
                net_price: 500,
                brute_price: 450
            }
        ]
    },
    {
        id: 2,
        date: '2021-10-12',
        total: 750,
        products: [
            {
                id: 3,
                name: 'Manzanas',
                store: 'Mi Tierra',
                quantity: 3,
                unit: 'kg',
                net_price: 50,
                brute_price: 45
            },
            {
                id: 2,
                name: 'Leche',
                store: 'Tienda Don Pepe',
                quantity: 2,
                unit: 'caja',
                net_price: 500,
                brute_price: 450
            }
        ]
    },
    {
        id: 3,
        date: '2021-10-14',
        total: 950,
        products: [
            {
                id: 4,
                name: 'Manzanas',
                store: 'Mi Tierra',
                quantity: 4,
                unit: 'kg',
                net_price: 50,
                brute_price: 45
            },
            {
                id: 2,
                name: 'Leche',
                store: 'Tienda Don Pepe',
                quantity: 3,
                unit: 'caja',
                net_price: 500,
                brute_price: 450
            }
        ]
    }
];

loadPage();