/*According to the DB model/Version 2/Collection Usuarios the list was adapted to simulate the connection*/
let users = [
    {
        id:1,
        nombre:"Christian",
        apellido:"Calderon",
        cedula:1234,
        telefono:1234, 
        correoElectronico:"c@gmail.com",
        tipoUsuario:"Vendedor",
        contraseña:1234,
        foto:"../resources/images/home/lupa.png",
        tramo:{
            nombre:"Tramo de frutas",
            estado:"Activo",
            descripcion:"Venta de frutas frescas",
            idDireccion:1,
            calificacion:5 
        } 
    },
    {
        id:2,
        nombre:"Daniel",
        apellido:"Camacho",
        cedula:4567,
        telefono:4567, 
        correoElectronico:"d@gmail.com",
        tipoUsuario:"Cliente",
        contraseña:4567,
        foto:"../resources/images/home/lupa.png",
    },
    {
        id:3,
        nombre:"Maricruz",
        apellido:"Perez",
        cedula:7894,
        telefono:7894, 
        correoElectronico:"m@gmail.com",
        tipoUsuario:"Administrador(a)",
        contraseña:7894,
        foto:"../resources/images/home/lupa.png",
    }
]

const user = localStorage.getItem('user');

changePasswordView();
saveEditChanges();
/*loadProfileFields(user);*/
/*loadSellerProfile()*/
/*loadAdminProfile();*/
loadCustomerProfile();

/**
 * Retrieve the change-password-view by clicking on the button "Cambiar contraseña". 
 */
function changePasswordView(){
    document.getElementById("btn-change-password").addEventListener("click", function(evento){
        evento.preventDefault();

        window.location.href = "index.html";
    })
}

function loadProfileFields(user){
    switch(user){
        case 'admin':
            loadAdminProfile();
            break;
        case 'cliente':
            loadCustomerProfile();
            break;
        case 'vendedor':
            loadSellerProfile();
            break;
        default:
            loadDefaultProfile();
            break;
    }
}

function loadSellerProfile(){
    let userType = document.querySelector("#user-type");
    userType.innerHTML = "Vendedor";

    let tramoName = document.querySelector("#tramo-name");
    tramoName.innerHTML = "Tramo de frutas";

    loadMainProfileInfo();
    
    let inputTramoName = document.querySelector("#input-tramo-name");
    inputTramoName.value = "Tramo de frutas";

    let inputAddress = document.querySelector("#address");
    inputAddress.value = "San Fra";
}

function loadAdminProfile(){
    let userType = document.querySelector("#user-type");
    userType.innerHTML = "Administrador";

    removeVendorOptions();
    loadMainProfileInfo();
}

function loadCustomerProfile(){
    let userType = document.querySelector("#user-type");
    userType.innerHTML = "Cliente";

    removeVendorOptions();
    loadMainProfileInfo();
}

function loadMainProfileInfo(){
    let userName = document.querySelector("#user-name");
    userName.innerHTML = "Christian XXXX"

    let identificationNumber = document.querySelector("#identification-number");
    identificationNumber.innerHTML = "1-XXXX-XXXX89";
    
    let inputName = document.querySelector("#name");
    inputName.value = "Christian";

    let inputLastName = document.querySelector("#last-name");
    inputLastName.value = "Calderon";

    let inputPhone = document.querySelector("#phone-number");
    inputPhone.value = "88556699";

    let inputEmail = document.querySelector("#email");
    inputEmail.value = "c@gmail.com";
}

function loadDefaultProfile(){
    let userType = document.querySelector("#user-type");
    userType.innerHTML = "No hay información";

    let tramoNameSection = document.querySelector(".tramo-name-section");
    tramoNameSection.remove();
}

function removeVendorOptions(){
    let tramoName = document.querySelector("#tramo-name");
    tramoName.remove();

    let divInputTramoName = document.querySelector("#div-input-tramo-name");
    divInputTramoName.remove();

    let inputAddress = document.querySelector("#input-address");
    inputAddress.remove();
}

/**
 * Display a message after clicking on the button located within the form. 
 * Creates two new elements, div and h2, which will be located at the bottom part of the form. The message is styled in red, centered and padded.
 */
function saveEditChanges(){
    document.getElementById("edit-profile").addEventListener("submit", function(evento){
        evento.preventDefault();

        let name = document.getElementById("name").value;
        let lastName = document.getElementById("last-name").value;
        /*let address = document.getElementById("address").value;*/
        let phone = document.getElementById("phone-number").value;
        let email = document.getElementById("email").value;
        /*let tramoName = document.getElementById("tramo-name").value;*/

        let confirmEdition = document.createElement("div");
        let confirmEditionMessage = document.createElement("h2");
        confirmEditionMessage.innerHTML = "Edición confirmada";
        confirmEdition.appendChild(confirmEditionMessage);

        let form = document.getElementById("edit-profile");
        form.appendChild(confirmEdition).style.cssText = 'color:red;text-align:center;padding:30px 0 15px 0';
    })
}
