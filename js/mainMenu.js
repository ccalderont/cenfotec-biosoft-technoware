loadMainMenu();

function loadMainMenu() {
    const user = localStorage.getItem('user');

    const menuOptions = getMenuOptions(user);
    
    loadMenuOptions(menuOptions);
}

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
            text: 'Contáctenos',
            href: 'contactenos.html'
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
            text: 'Contáctenos',
            href: 'contactenos.html'
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
            text: 'Contáctenos',
            href: 'contactenos.html'
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
            text: 'Contáctenos',
            href: 'contactenos.html'
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


function loadMenuOptions(menuOptions){
    loadNavOptions(menuOptions.firstNavoptions, 'first-nav');
    loadNavOptions(menuOptions.secondNavoptions, 'second-nav');
    loadSearchBarOptions(menuOptions.showSearchBar);
}

function loadNavOptions(options, navName){
    const firstNav = document.getElementById(navName);
    const ul = document.createElement('ul');
    for(const option of options){
        addMenuOption(ul, option);
    } 
    firstNav.appendChild(ul);
}

function loadSearchBarOptions(showSearchBar){
    if(showSearchBar) return; // La barra de búsqueda ya se encuentra en el código HTML
    const searchBar = document.getElementById('menu-search-bar');
    searchBar.style.display = 'none';
}

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

function showExtraOptions(li){
    const ulExtras = document.getElementsByClassName('extra-menu-options');
    const currentUlExtra = li.getElementsByClassName('extra-menu-options-hidden')[0];
    for(const ulExtra of ulExtras){
        ulExtra.classList.add('extra-menu-options-hidden');
    }

    if(!currentUlExtra) return;
    currentUlExtra.classList.remove('extra-menu-options-hidden');
    
}



// Ocultar opciones extra al hacer click fuera de ellas
document.addEventListener('click', function(event) {
    if(event.target.parentElement.classList.contains('extra-menu')) return; // Si se hace click en una opción extra no se ocultan las opciones
    var extraOptions = document.getElementsByClassName('extra-menu-options');
    for(const option of extraOptions){
        option.classList.add('extra-menu-options-hidden');
    }
});