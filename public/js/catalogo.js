let currentPage = 0; // Global variable that stores the current page number
let numberOfPages = 0; // Global variable that stores the number of pages
let impuestoAdmin = 0; // Global variable that stores the admin tax
/**
 * Run when loading the page. Sets up the page accordingly
 */
window.onload = async function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('producto')
    impuestoAdmin = await getImpuestoAdmin();
    numberOfPages = await addProductsToCatalogue(false);
    await setCategories();
    await setStores();
    showPage(); // At the start it will show the first page
    activatePaginationButtons();
    removeCartButtons();
    if(product && product !== ""){
        document.getElementById("product-name-filter").value = product;
        filterProducts();
    }
}

async function filterProducts(){
    currentPage = 0;
    numberOfPages = await addProductsToCatalogue(true);
    showPage();
    activatePaginationButtons();
    removeCartButtons();
}

async function setCategories(){
    const categories = await getCategories();
    const categoriesSelect = document.getElementById("category");
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category._id;
        option.text = category.nombre;
        categoriesSelect.appendChild(option);
    });
}

async function getCategories(){
    const response = await fetch('/getActiveCategories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data.categorias;
}


async function setStores(){
    const stores = await getStores();
    const storesSelect = document.getElementById("store-name-filter");
    stores.forEach((store) => {
        const option = document.createElement("option");
        option.value = store._id;
        option.text = store.nombre;
        storesSelect.appendChild(option);
    });
}

async function getStores(){
    const response = await fetch('/getAllStores', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data.stores;
}


async function getImpuestoAdmin(){
    const response = await fetch('/getImpuestoAdmin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data.impuesto;
}

/**
 * Confirms if the user is logged in as a client
 * @returns {boolean} - True if the user is logged in as a client, false otherwise
 * */
function clientUserIsLoggedIn(){
    return localStorage.getItem('tipoUsuario') === 'cliente';
}

/**
 * Removes the cart buttons if the logged on user is not a client
 * */
function removeCartButtons(){
    if(clientUserIsLoggedIn()) return;
    const cartButtons = document.getElementsByClassName("add-to-cart-catalogue");
    for (let i = cartButtons.length-1; i >= 0; i--){
        cartButtons[i].remove();
    }
}

/**
 * Activates the pagination buttons if there are more than 0 pages
 */
function activatePaginationButtons(){
    if(!numberOfPages || numberOfPages < 2) return; // If there are no pages, then there is no need to activate the buttons
    document.getElementById("next-page").classList.remove("hidden-element");
}

/**
 * Removes the class that hides the catalogue items from the page number specified
 */
function showPage(){
    hideAllPages(); // First hide all the pages, before showing the current one
    const pageClassToShow = document.getElementsByClassName(`page-${currentPage}`);
    for (let i = 0; i < pageClassToShow.length; i++){
        pageClassToShow[i].classList.remove("hidden-element");
    }
    // Go to the start of the page
    // window.scrollTo(0, 0);
}

/**
 * Hides all the catalogue items
 */
function hideAllPages(){
    const catalogueItems = document.getElementsByClassName("catalogue-item");
    for (let i = 0; i < catalogueItems.length; i++){
        catalogueItems[i].classList.add("hidden-element");
    }
}

/** 
 * Used when clicking the pagination buttons to change the page
 * @param {HTMLElement} target - The target element that was clicked
*/
function changePage(target){
    const nextButton = document.getElementById("next-page");
    const previousButton = document.getElementById("previous-page");
    if(target.id == "previous-page"){
        currentPage--;
        nextButton.classList.remove("hidden-element");
        if(currentPage == 0){
            previousButton.classList.add("hidden-element");
        }
    }else{
        currentPage++;
        previousButton.classList.remove("hidden-element");
        if(currentPage == numberOfPages){
            nextButton.classList.add("hidden-element");
        }
    }
    showPage();
}

async function getProducts(filter){
    let response = null;
    
    if(!filter) {
        response = await fetch('/getActiveProducts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } else {
        const filtersSelected = {
            categoria: document.getElementById("category").value,
            tramo: document.getElementById("store-name-filter").value,
            nombre: document.getElementById("product-name-filter").value,
        };
        response = await fetch(`/getProductsFiltered`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filtersSelected)
        });
    }
    const data = await response.json();
    return data;
}

/** 
 * Adds the products to the catalogue section with their corresponding page class
 * @returns {int} - The number of pages created
*/
async function addProductsToCatalogue(filter){
    const products = await getProducts(filter);
    const catalogue = document.getElementById("catalogue-section");
    catalogue.innerHTML = ""; // Initialize the catalogue everytime
    document.getElementById("no-product-message").innerHTML= "";
    if(!products || products.message === "Error en el servidor" || products.length === 0){
        document.getElementById("no-product-message").innerHTML= "<h3>No se encontró ningún producto</h3>";
        catalogue.style.minWidth = 0;
        document.getElementById("next-page").classList.add("hidden-element");
        return;
    }

    catalogue.style.minWidth = "1080px";
    let pageNumber = 0;
    let productsPerPage = 12;
    products.forEach((product) => {
        const pageClass = 'page-' + pageNumber;
        const productItem = createProductItem(product, pageClass);
        catalogue.appendChild(productItem);
        // If the number of products per page is 0, then we need to create a new page
        productsPerPage--;
        if (productsPerPage == 0){
            pageNumber++;
            productsPerPage = 12;
        }
    });
    return pageNumber;
}

/**
 * Creates the HTML structure for a product item
 * @param {Object} product - A Json object with the information of the product
 * @param {string} pageClass - The class indicating the page where the product is located
 * @returns {HTMLElement} - The HTML element with the product information
 * */
function createProductItem(product, pageClass){
    const precioTotalProducto = getTotalPrice(product.precioBruto, product.impuesto);
    const article = document.createElement("article");
    article.classList.add("catalogue-item");
    article.classList.add("hidden-element");
    article.classList.add(pageClass);
    article.innerHTML = `
        <img class="product-img" src="${product.foto}" alt="${product.nombre}">
        
        <section class="catalogue-item-info">
            <h2>${product.nombre}</h2>
            <p>${product.descripcion}</p>
            <section class="store-and-rating">
                <p><strong>${product.tramo.nombre}</strong></p>
                <p>${getStarsCalification(product.calificacion)}</p>
            </section>
            <section class="price-and-button">
                <p>₡${precioTotalProducto}</p>
                <span class="add-to-cart-catalogue"
                    data-productid="${product._id}"
                    data-productname="${product.nombre}"
                    data-productdescription="${product.descripcion}"
                    data-productprice="${precioTotalProducto}"
                    data-productimage="${product.foto}"
                    data-productquantity="${product.cantidadDisponible}"
                    data-productunit="${product.unidadMedida}"
                    onclick=showModal(this)><button>Agregar al carrito</button></span>
            </section>
        </section>
    `;
    return article;
}


function getTotalPrice(precioBruto, impuestoVendedor){
    return precioBruto + (precioBruto * (impuestoAdmin + impuestoVendedor) / 100);
}


/**
 * Returns a string with the stars for the calification number
 * @param {int} calification - The calification number
 * @returns {string} - The string with the stars for the calification number
 */
function getStarsCalification(calification){
    let stars = "";
    for (let i = 0; i < calification; i++){
        stars += "⭐";
    }
    return stars;
}

/**
 * Shows the modal to add the product to the cart
 */

function showModal(target) {
    document.getElementById('modal-product-name').innerHTML = target.getAttribute('data-productname');
    document.getElementById('modal-product-description').innerHTML = target.getAttribute('data-productdescription');
    document.getElementById('modal-product-price').innerHTML = "₡" + parseFloat(target.getAttribute('data-productprice')).toFixed(2);
    document.getElementById('modal-product-image').src = target.getAttribute('data-productimage');
    document.getElementById('modal-product-image').alt = target.getAttribute('data-productname');
    document.getElementById('modal-product-quantity').max = target.getAttribute('data-productquantity');
    document.getElementById('modal-product-quantity').value = 1;
    document.getElementById('modal-product-unit').innerHTML = target.getAttribute('data-productunit');
    document.getElementById('selected-product-id').value = target.getAttribute('data-productid');
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
}

/**
 * Closes the modal to add to the cart
 */
function closeModal(event){
    if (event.target.id === "modal" || event.target.classList.contains("close-modal")) {
        let modal = document.getElementById('modal');
        // If it was, hide the modal
        modal.style.display = 'none';
    }
}

/**
 * Adds the product and quantity selected to the cart
 * @param {HTMLElement} target - The target element that was clicked
 */
async function addToCart(target){
    target.innerHTML = `<button><i class="fa-solid fa-spinner fa-spin-pulse" style="color: white;"></i></button>`;
    const result = await fetch('/cliente/agregarCarrito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            producto: document.getElementById('selected-product-id').value,
            cantidad: document.getElementById('modal-product-quantity').value,
            usuario: localStorage.getItem('idUsuario')
        })
    });
    const data = await result.json();
    if(data.message === "Producto agregado al carrito"){
        target.innerHTML = `<button><i class="fas fa-check" style="color: white;"></i></button>`;
        setTimeout(() => {
            document.getElementById('modal').style.display = 'none';
            target.innerHTML = `<button>Agregar al carrito</button>`;
        }, 500);
        
        return;
    }

    target.innerHTML = `<button>Agregar al carrito</button>`;
    alert("No se pudo agregar el producto al carrito");
    
}

function removeFilters(){
    document.getElementById("category").value = "*";
    document.getElementById("store-name-filter").value = "*";
    document.getElementById("product-name-filter").value = "";
    filterProducts();
}