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
    totalPrice.innerText = `Net total with admin taxes: ₡${total}`
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
    totalPrice.innerText = `Net total with my taxes: ₡${total}`
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
    totalPrice.innerText = `Brute total: ₡${total}`;
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
        </tr>
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
        total_with_admin_taxes: 1320
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