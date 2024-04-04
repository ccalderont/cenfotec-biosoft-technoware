/**
 * Set the dynamic information of the page
 */
function loadPage(){
    loadStoresTable();
}

/**
 * Loads the table with the sells information
 */
function loadStoresTable(){
    const table = document.getElementById('stores-tbody');
    stores.forEach(store => {
        const row = createRow(store);
        table.appendChild(row);
    });
}

/**
 * Gets the information of the sell and creates a row element with it
 * @param {Object} store - Object with the information of a sell 
 * @returns {HTMLElement} - Row element with the information of the sell
 */
function createRow(store){
    const row = document.createElement('tr');
    row.innerHTML = `
        <tr>
            <td>${store.date}</td>
            <td>${store.name}</td>
            <td>${store.description}</td>
            <td>${store.id_user}</td>
            <td>${store.address}</td>
            <td class='centered-td'><a href=${store.permission} download><i class="fa-solid fa-download"></i></a></td>
            <td class='centered-td'><span><i class="fa-solid fa-square-check"></i></span><span><i class="fa-solid fa-rectangle-xmark"></i></span></td>
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
    displayModalInView();
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

loadPage();