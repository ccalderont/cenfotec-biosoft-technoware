loadMainMenu();

/**
 * Gets the type of logged in user and loads the options of the nav bar based on that
 * */
function loadMainMenu() {
    const user = localStorage.getItem('user');

    const menuOptions = getMenuOptions(user);
    
    loadMenuOptions(menuOptions);
}

/**
 * Depending on the type of logged in user returns the options that should be loaded
 * @param {string} user - Type of user logged in
 * @returns {Object} - Organized object of menu options
 * */
function getMenuOptions(user){
    let menuOptions = null;
    switch(user){
        case 'admin':
            menuOptions = loadAdminMenu();
            break;
        case 'cliente':
            menuOptions = loadClientMenu();
            break;
        case 'vendedor':
            menuOptions = loadSellerMenu();
            break;
        default:
            menuOptions = loadDefaultMenu();
            break;
    }
    return menuOptions;
}

/**
 * Returns the menu options for the admin
 * @returns {Object} - Organized object of menu options for the admin
 */
function loadAdminMenu(){
    const firstNavoptions = [
        {
            text: 'Inicio',
            href: 'index.html'
        },
        {
            text: 'Configuración',
            extraOptions:[
                {
                    text: 'Categorías',
                    href: 'categorias.html'
                },
                {
                    text: 'Impuesto de Administrador',
                    href: 'impuestAdmin.html'
                },
                {
                    text: 'Solicitudes Pendientes',
                    href: 'solicitudesPendientes.html'
                }
            ]
        },
        {
            text: 'Reportes',
            extraOptions:[
                {
                    text: 'Ventas',
                    href: 'reporteVentasAdmin.html'
                },
                {
                    text: 'Productos',
                    href: 'reporteProductosAdmin.html'
                },
                {
                    text: 'Tramos',
                    href: 'reporteTramosAdmin.html'
                },
                {
                    text: 'Usuarios',
                    href: 'reporteUsuariosAdmin.html'
                }
            ]
        },
        {
            text: 'Sobre Nosotros',
            href: 'sobrenosotros.html'
        }
    ];

    const showSearchBar = false;
    
    const secondNavoptions = [
        {
            text: '<i class="fa-solid fa-user fa-xl"></i>',
            href: 'userProfile.html'
        },
        {
            text: '<i class="fa-solid fa-right-from-bracket fa-xl"></i>',
            href: 'formularioLogin.html'
        }

    ];

    const menuOptions = {
        firstNavoptions,
        showSearchBar,
        secondNavoptions
    }

    return menuOptions;
}

/**
 * Returns the menu options for the seller
 * @returns {Object} - Organized object of menu options for the seller
 */
function loadSellerMenu(){
    const firstNavoptions = [
        {
            text: 'Inicio',
            href: 'index.html'
        },
        {
            text: 'Mi tramo',
            extraOptions:[
                {
                    text: 'Mis productos',
                    href: 'misProductos.html'
                },
                {
                    text: 'Mis ventas',
                    href: 'misVentas.html'
                }
            ]
        },
        {
            text: 'Sobre Nosotros',
            href: 'sobrenosotros.html'
        }
    ];

    const showSearchBar = false;

    const secondNavoptions = [
        {
            text: '<i class="fa-solid fa-user fa-xl"></i>',
            href: 'userProfile.html'
        },
        {
            text: '<i class="fa-solid fa-right-from-bracket fa-xl"></i>',
            href: 'formularioLogin.html'
        }

    ];

    const menuOptions = {
        firstNavoptions,
        showSearchBar,
        secondNavoptions
    }

    return menuOptions;
}

/**
 * Returns the menu options for the client
 * @returns {Object} - Organized object of menu options for the client
 */
function loadClientMenu(){
    const firstNavoptions = [
        {
            text: 'Inicio',
            href: 'index.html'
        },
        {
            text: 'Catálogo',
            href: 'catalogo.html'
        },
        {
            text: 'Mis compras',
            href: 'misCompras.html'
        },
        {
            text: 'Sobre Nosotros',
            href: 'sobrenosotros.html'
        }
    ];

    const showSearchBar = true;

    const secondNavoptions = [
        {
            text: '<i class="fa-solid fa-user fa-xl"></i>',
            href: 'userProfile.html'
        },
        
        {
            text: '<i class="fa-solid fa-cart-shopping fa-xl"></i>',
            href: 'carrito.html'
        },
        {
            text: '<i class="fa-solid fa-right-from-bracket fa-xl"></i>',
            href: 'formularioLogin.html'
        }

    ];

    const menuOptions = {
        firstNavoptions,
        showSearchBar,
        secondNavoptions
    }

    return menuOptions;
}

/**
 * Returns the menu options when not logged in
 * @returns {Object} - Organized object of menu options when the user is not logged in
 */
function loadDefaultMenu(){
    const firstNavoptions = [
        {
            text: 'Inicio',
            href: 'index.html'
        },
        {
            text: 'Catálogo',
            href: 'catalogo.html'
        },
        {
            text: 'Sobre Nosotros',
            href: 'sobrenosotros.html'
        }
    ];

    const showSearchBar = true;

    const secondNavoptions = [
        {
            text: '<i class="fa-solid fa-right-to-bracket fa-xl"></i>',
            href: 'formularioLogin.html'
        }
    ];

    const menuOptions = {
        firstNavoptions,
        showSearchBar,
        secondNavoptions
    }

    return menuOptions;
}

/**
 * Configures the corresponding parts of the menu options (navs and search bar)
 * @param {Object} menuOptions 
 */
function loadMenuOptions(menuOptions){
    loadNavOptions(menuOptions.firstNavoptions, 'first-nav');
    loadNavOptions(menuOptions.secondNavoptions, 'second-nav');
    loadSearchBarOptions(menuOptions.showSearchBar);
}

/**
 * Loads the menu options of the specific parts of the nav bar
 * @param {Object[]} options - Organized array of menu options
 * @param {string} navName - Id of the nav to be configured 
 */
function loadNavOptions(options, navName){
    const firstNav = document.getElementById(navName);
    const ul = document.createElement('ul');
    for(const option of options){
        addMenuOption(ul, option);
    } 
    firstNav.appendChild(ul);
}

/**
 * Shows or hides the search bar
 * @param {boolean} showSearchBar - Informs if the search box in the bar should show or not
 * @returns 
 */
function loadSearchBarOptions(showSearchBar){
    if(showSearchBar) return; // La barra de búsqueda ya se encuentra en el código HTML
    const searchBar = document.getElementById('menu-search-bar');
    searchBar.style.display = 'none';
}

/**
 * Creates the menu option and sets the reference
 * @param {HTMLElement} ul - List where the menu options should be loaded 
 * @param {Object} option - Option name and name of html file it references
 * @returns 
 */
function addMenuOption(ul, option){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.innerHTML = option.text;
    if(option.href){
        a.href = option.href;
    }
    li.appendChild(a);
    ul.appendChild(li);
    if(!option.extraOptions) return;
    addExtraOptions(li, option);
}

/**
 * Adds the suboptions in the navigation menu
 * @param {HTMLElement} li - Main menu option that contains the suboptions
 * @param {Object} option - Option name and name of html file it references
 */
function addExtraOptions(li, option){
    const ulExtra = document.createElement('ul');
    ulExtra.classList.add('extra-menu-options-hidden'); // Se ocultan las opciones extra por defecto con CSS
    ulExtra.classList.add('extra-menu-options');
    for(const extraOption of option.extraOptions){
        
        addMenuOption(ulExtra, extraOption);
        
    }
    li.appendChild(ulExtra);
    li.classList.add('extra-menu');
    li.addEventListener('click', () => showExtraOptions(li)); // Se añade un evento para mostrar las opciones extra al hacer click
}

/**
 * Called when clicking a menu option that contains extra options.
 * It also hides the suboptions showing of other menu options
 * @param {HTMLElement} li - Target menu option that is clicked
 * @returns 
 */
function showExtraOptions(li){
    const ulExtras = document.getElementsByClassName('extra-menu-options');
    const currentUlExtra = li.getElementsByClassName('extra-menu-options-hidden')[0];
    for(const ulExtra of ulExtras){
        ulExtra.classList.add('extra-menu-options-hidden');
    }

    if(!currentUlExtra) return;
    currentUlExtra.classList.remove('extra-menu-options-hidden');
    
}

/**
 * Click event to the document - hides any suboptions showing when clicking anything outside of them
 */
document.addEventListener('click', function(event) {
    if(event.target.parentElement.classList.contains('extra-menu')) return; // If an extra option is clicked, this one does not hide
    var extraOptions = document.getElementsByClassName('extra-menu-options');
    for(const option of extraOptions){
        option.classList.add('extra-menu-options-hidden');
    }
});