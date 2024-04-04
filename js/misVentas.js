/**
 * Set the dynamic information of the page
 */
function loadPage(){
    loadTable();
    setUpTotalBrutePrice();
    setUpTotalNetPriceWithVendorTaxes();
    setUpTotalNetPriceWithAdminTaxes();
}

/**
 * Sets the net price of the sells with the admin taxes in the page
 */
function setUpTotalNetPriceWithAdminTaxes(){
    const totalPrice = document.getElementById('total-net-with-admin-taxes');
    const total = getTotalNetExpenseWithAdminTaxes();
    totalPrice.innerText = `Total con impuestos de admin: ₡${total}`
}

/**
 * Returns the total net expense of all the sells with the admins's taxes currently showing in the page
 * @returns 
 */
function getTotalNetExpenseWithAdminTaxes(){
    return sells.reduce((acc, sell) => acc + sell.total_with_admin_taxes, 0);
}

/**
 * Sets the net price of the sells with the vendor taxes in the page
 */
function setUpTotalNetPriceWithVendorTaxes(){
    const totalPrice = document.getElementById('total-net-with-my-taxes');
    const total = getTotalNetExpenseWithVendorTaxes();
    totalPrice.innerText = `Total con mis impuestos: ₡${total}`
}

/**
 * Returns the total net expense of all the sells with the vendor's taxes currently showing in the page
 * @returns 
 */
function getTotalNetExpenseWithVendorTaxes(){
    return sells.reduce((acc, sell) => acc + sell.net_price_my_tax, 0);
}

/**
 * Sets the total brute price of the sells in the page
 */
function setUpTotalBrutePrice(){
    const totalPrice = document.getElementById('total-brute-price');
    const total = getTotalBruteExpense();
    totalPrice.innerText = `Total bruto: ₡${total}`;
}

/**
 * Returns the total brute expense of all the sells currently showing in the page
 * @returns {number} - Total expense of all the sells
 */
function getTotalBruteExpense(){
    return sells.reduce((acc, sell) => acc + sell.brute_price, 0);
}

/**
 * Loads the table with the sells information
 */
function loadTable(){
    const table = document.getElementById('sells-tbody');
    sells.forEach(sell => {
        const row = createRow(sell);
        table.appendChild(row);
    });
}

/**
 * Gets the information of the sell and creates a row element with it
 * @param {Object} sell - Object with the information of a sell 
 * @returns {HTMLElement} - Row element with the information of the sell
 */
function createRow(sell){
    const row = document.createElement('tr');
    row.innerHTML = `
        <tr>
            <td>${sell.date}</td>
            <td>${sell.product}</td>
            <td>${sell.quantity} ${sell.unit}</td>
            <td>${sell.id_client}</td>
            <td>₡${sell.brute_price}</td>
            <td>₡${sell.net_price_my_tax}</td>
            <td>₡${sell.total_with_admin_taxes}</td>
            ${(sell.review) ?
                `<td class="centered-td"
                data-purchaseid="${sell.id}"
                data-productname="${sell.product}"
                data-reviewid="${sell.review.id}"
                data-stars="${sell.review.stars}"
                data-comment="${sell.review.comment}"
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



const sells= [
    {
        id: 1,
        date: '2021-10-10',
        product: 'Manzanas',
        quantity: 10,
        unit: 'unidades',
        id_client: 'Jose Fernandez',
        brute_price: 1200,
        net_price_my_tax: 1250,
        total_with_admin_taxes: 1320,
        review: {
            id: 1,
            stars: 5,
            comment: 'Excelente producto, muy fresco y delicioso'
        }
    },
    {
        id: 2,
        date: '2021-10-10',
        product: 'Manzanas',
        quantity: 10,
        unit: 'unidades',
        id_client: 'Jose Fernandez',
        brute_price: 1200,
        net_price_my_tax: 1250,
        total_with_admin_taxes: 1320
    },
    {
        id: 3,
        date: '2021-10-10',
        product: 'Manzanas',
        quantity: 10,
        unit: 'unidades',
        id_client: 'Jose Fernandez',
        brute_price: 1200,
        net_price_my_tax: 1250,
        total_with_admin_taxes: 1320
    },
    {
        id: 4,
        date: '2021-10-10',
        product: 'Manzanas',
        quantity: 10,
        unit: 'unidades',
        id_client: 'Jose Fernandez',
        brute_price: 1200,
        net_price_my_tax: 1250,
        total_with_admin_taxes: 1320
    },
];

loadPage();