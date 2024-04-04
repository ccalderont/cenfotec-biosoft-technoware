let currentPage = 0; // Global variable that stores the current page number
let numberOfPages = 0; // Global variable that stores the number of pages

/**
 * Run when loading the page. Sets up the page accordingly
 */
window.onload = function() {
    numberOfPages = addProductsToCatalogue();
    showPage(); // At the start it will show the first page
    activatePaginationButtons();
    removeCartButtons();
}

/**
 * Confirms if the user is logged in as a client
 * @returns {boolean} - True if the user is logged in as a client, false otherwise
 * */
function clientUserIsLoggedIn(){
    return localStorage.getItem('user') === 'cliente';
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
    if(numberOfPages == 0) return; // If there are no pages, then there is no need to activate the buttons
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

/** 
 * Adds the products to the catalogue section with their corresponding page class
 * @returns {int} - The number of pages created
*/
function addProductsToCatalogue(){
    const catalogue = document.getElementById("catalogue-section");
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
    const article = document.createElement("article");
    article.classList.add("catalogue-item");
    article.classList.add("hidden-element");
    article.classList.add(pageClass);
    article.innerHTML = `
        <img class="product-img" src="${product.imagen}" alt="${product.nombre}">
        <hr class="image-divider">
        <section class="catalogue-item-info">
            <h2>${product.nombre}</h2>
            <p>${product.descripcion}</p>
            <section class="store-and-rating">
                <p>${product.tramo}</p>
                <p>${getStarsCalification(product.calificacion)}</p>
            </section>
            <section class="price-and-button">
                <p>₡${parseFloat(product.precio).toFixed(2)}</p>
                <span class="add-to-cart-catalogue"
                    data-productid="${product.id}"
                    data-productname="${product.nombre}"
                    data-productdescription="${product.descripcion}"
                    data-productprice="${product.precio}"
                    data-productimage="${product.imagen}"
                    data-productquantity="${product.cantidad}"
                    data-productunit="${product.unidad}"
                    onclick=showModal(this)><i class="fa-solid fa-cart-plus fa-lg"></i></span>
            </section>
        </section>
    `;
    return article;
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
    document.getElementById('modal-product-unit').innerHTML = target.getAttribute('data-productunit');
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
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
 * Adds the product and quantity selected to the cart
 * @param {HTMLElement} target - The target element that was clicked
 */
function addToCart(target){
    target.innerHTML = `<i class="fa-solid fa-square-check fa-lg" style="color: #005b4d;"></i>`;
    setTimeout(() => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(!cart){
            cart = [];
        }
        let product = {
            id: target.getAttribute('data-productid'),
            quantity: document.getElementById('modal-product-quantity').value,
        }
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        closeModal({target: {id: "modal"}});
        target.innerHTML = `<i class="fa-solid fa-cart-plus fa-lg"></i>`;
    }, 500);
}





const products = [
    
    
    
    
    {
        id: 7,
        nombre: "Uvas",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Piña de Tía Panchita",
        calificacion: 4,
        precio: 400,
        cantidad: 1,
        unidad: "kg",
        imagen: "https://www.saluzzocr.com/wp-content/uploads/2021/08/pinia-el-sabor-de-la-frecura-1.jpg"
    },
    
    {
        id: 9,
        nombre: "Mango",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Mango de Tía Panchita",
        calificacion: 3,
        precio: 500,
        cantidad: 8,
        unidad: "gramos",
        imagen: "https://www.finedininglovers.com/es/sites/g/files/xknfdk1706/files/styles/article_1200_800_fallback/public/2021-10/mango%C2%A9iStock.jpg?itok=b0BXEvPw"
    },
    
    {
        id: 11,
        nombre: "Melón",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Melón de Tía Panchita",
        calificacion: 2,
        precio: 600,
        cantidad: 65,
        unidad: "kg",
        imagen: "https://elpoderdelconsumidor.org/wp-content/uploads/2023/02/melon.jpg"
    },
    {
        id: 12,
        nombre: "Ciruela",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Ciruela de Tía Panchita",
        calificacion: 5,
        precio: 650,
        cantidad: 40,
        unidad: "kg",
        imagen: "https://www.infocampo.com.ar/wp-content/uploads/2021/02/ciruelas-senasa-infocampo.jpg"
    },
    {
        id: 13,
        nombre: "Papaya",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Papaya de Tía Panchita",
        calificacion: 5,
        precio: 550,
        cantidad: 90,
        unidad: "unidades",
        imagen: "https://eldiariony.com/wp-content/uploads/sites/2/2023/07/shutterstock_1528885103.jpg?w=1200"
    },
    {
        id: 14,
        nombre: "Naranjas",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Naranjas de Tía Panchita",
        calificacion: 5,
        precio: 450,
        cantidad: 450,
        unidad: "kg",
        imagen: "https://imagenes.20minutos.es/files/image_640_auto/uploads/imagenes/2023/06/12/2-naranjas.jpeg"
    },
    {
        id: 15,
        nombre: "Mango",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Mango de Tía Panchita",
        calificacion: 3,
        precio: 500,
        cantidad: 20,
        unidad: "unidades",
        imagen: "https://www.finedininglovers.com/es/sites/g/files/xknfdk1706/files/styles/article_1200_800_fallback/public/2021-10/mango%C2%A9iStock.jpg?itok=b0BXEvPw"
    },
    {
        id: 16,
        nombre: "Ciruela",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Ciruela de Tía Panchita",
        calificacion: 5,
        precio: 650,
        cantidad: 5,
        unidad: "litros",
        imagen: "https://www.infocampo.com.ar/wp-content/uploads/2021/02/ciruelas-senasa-infocampo.jpg"
    },
    {
        id: 17,
        nombre: "Mango",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Mango de Tía Panchita",
        calificacion: 3,
        precio: 500,
        cantidad: 1,
        unidad: "kg",
        imagen: "https://www.finedininglovers.com/es/sites/g/files/xknfdk1706/files/styles/article_1200_800_fallback/public/2021-10/mango%C2%A9iStock.jpg?itok=b0BXEvPw"
    },
    {
        id: 18,
        nombre: "Papaya",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Papaya de Tía Panchita",
        calificacion: 5,
        precio: 550,
        cantidad: 1,
        unidad: "kg",
        imagen: "https://eldiariony.com/wp-content/uploads/sites/2/2023/07/shutterstock_1528885103.jpg?w=1200"
    },
    {
        id: 19,
        nombre: "Melón",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Melón de Tía Panchita",
        calificacion: 2,
        precio: 600,
        cantidad: 1,
        unidad: "kg",
        imagen: "https://elpoderdelconsumidor.org/wp-content/uploads/2023/02/melon.jpg"
    },
    {
        id: 20,
        nombre: "Sandía",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Sandía de Tía Panchita",
        calificacion: 5,
        precio: 300,
        cantidad: 95,
        unidad: "unidades",
        imagen: "https://s1.eestatic.com/2021/08/18/ciencia/nutricion/605201362_200816272_1706x960.jpg"
    },
    {
        id: 34,
        nombre: "Ciruela",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Ciruela de Tía Panchita",
        calificacion: 5,
        precio: 650,
        cantidad: 125,
        unidad: "kg",
        imagen: "https://www.infocampo.com.ar/wp-content/uploads/2021/02/ciruelas-senasa-infocampo.jpg"
    },
    {
        id: 21,
        nombre: "Banano",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Banano de Tía Panchita",
        calificacion: 1,
        precio: 350,
        cantidad: 114,
        unidad: "kg",
        imagen: "https://cnnespanol.cnn.com/wp-content/uploads/2014/01/120604032828-fresh-ripe-bananas-story-top-e1694020100421.jpg?quality=100&strip=info"
    },
    {
        id: 22,
        nombre: "Papaya",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Papaya de Tía Panchita",
        calificacion: 5,
        precio: 550,
        cantidad: 184,
        unidad: "kg",
        imagen: "https://eldiariony.com/wp-content/uploads/sites/2/2023/07/shutterstock_1528885103.jpg?w=1200"
    },
    {
        id: 23,
        nombre: "Melón",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Melón de Tía Panchita",
        calificacion: 2,
        precio: 600,
        cantidad: 142,
        unidad: "kg",
        imagen: "https://elpoderdelconsumidor.org/wp-content/uploads/2023/02/melon.jpg"
    },
    {
        id: 24,
        nombre: "Ciruela",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Ciruela de Tía Panchita",
        calificacion: 5,
        precio: 650,
        cantidad: 174,
        unidad: "kg",
        imagen: "https://www.infocampo.com.ar/wp-content/uploads/2021/02/ciruelas-senasa-infocampo.jpg"
    },
    {
        id: 25,
        nombre: "Papaya",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Papaya de Tía Panchita",
        calificacion: 5,
        precio: 550,
        cantidad: 14,
        unidad: "kg",
        imagen: "https://eldiariony.com/wp-content/uploads/sites/2/2023/07/shutterstock_1528885103.jpg?w=1200"
    },
    {
        id: 26,
        nombre: "Naranjas",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Naranjas de Tía Panchita",
        calificacion: 5,
        precio: 450,
        cantidad: 1,
        unidad: "kg",
        imagen: "https://imagenes.20minutos.es/files/image_640_auto/uploads/imagenes/2023/06/12/2-naranjas.jpeg"
    },
    {
        id: 27,
        nombre: "Mango",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Mango de Tía Panchita",
        calificacion: 3,
        precio: 500,
        cantidad: 1,
        unidad: "kg",
        imagen: "https://www.finedininglovers.com/es/sites/g/files/xknfdk1706/files/styles/article_1200_800_fallback/public/2021-10/mango%C2%A9iStock.jpg?itok=b0BXEvPw"
    },
    {
        id: 28,
        nombre: "Ciruela",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Ciruela de Tía Panchita",
        calificacion: 5,
        precio: 650,
        cantidad: 1,
        unidad: "kg",
        imagen: "https://www.infocampo.com.ar/wp-content/uploads/2021/02/ciruelas-senasa-infocampo.jpg"
    },
    {
        id: 29,
        nombre: "Mango",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Mango de Tía Panchita",
        calificacion: 3,
        precio: 500,
        cantidad: 1,
        unidad: "kg",
        imagen: "https://www.finedininglovers.com/es/sites/g/files/xknfdk1706/files/styles/article_1200_800_fallback/public/2021-10/mango%C2%A9iStock.jpg?itok=b0BXEvPw"
    },
    {
        id: 30,
        nombre: "Papaya",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Papaya de Tía Panchita",
        calificacion: 5,
        precio: 550,
        cantidad: 1,
        unidad: "kg",
        imagen: "https://eldiariony.com/wp-content/uploads/sites/2/2023/07/shutterstock_1528885103.jpg?w=1200"
    },
    {
        id: 31,
        nombre: "Melón",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Melón de Tía Panchita",
        calificacion: 2,
        precio: 600,
        cantidad: 90,
        unidad: "litros",
        imagen: "https://elpoderdelconsumidor.org/wp-content/uploads/2023/02/melon.jpg"
    },
    {
        id: 32,
        nombre: "Sandía",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Sandía de Tía Panchita",
        calificacion: 5,
        precio: 300,
        cantidad: 200,
        unidad: "unidades",
        imagen: "https://s1.eestatic.com/2021/08/18/ciencia/nutricion/605201362_200816272_1706x960.jpg"
    },
    {
        id: 33,
        nombre: "Banano",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        tramo: "Banano de Tía Panchita",
        calificacion: 1,
        precio: 350,
        cantidad: 1,
        unidad: "kg",
        imagen: "https://cnnespanol.cnn.com/wp-content/uploads/2014/01/120604032828-fresh-ripe-bananas-story-top-e1694020100421.jpg?quality=100&strip=info"
    },
];