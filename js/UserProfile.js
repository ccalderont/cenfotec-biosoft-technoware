/*According to the DB model/Version 2/Collection Usuarios the list was adapted to simulate the connection*/
let users = {
        id:1,
        nombre:"Christian",
        apellido:"Calderon",
        cedula:1234,
        telefono:12347845, 
        correoElectronico:"c@gmail.com",
        tipoUsuario:"Vendedor",
        contraseña:1234,
        foto:"../resources/images/home/lupa.png",
        tramo:{
            nombre:"Tramo de frutas",
            estado:"Activo",
            descripcion:"Venta de frutas frescas",
            idDireccion:112,
            calificacion:5 
        } 
    };

const user = localStorage.getItem('user');

changePasswordView();
saveEditChanges(user);
loadProfileFields(user);

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
    tramoName.innerHTML = users.tramo.nombre;

    loadMainProfileInfo();
    
    let inputTramoName = document.querySelector("#input-tramo-name");
    inputTramoName.value = users.tramo.nombre;

    let inputAddress = document.querySelector("#address");
    inputAddress.value = users.tramo.idDireccion;
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
    userName.innerHTML = users.nombre + " " + users.apellido;

    let identificationNumber = document.querySelector("#identification-number");
    identificationNumber.innerHTML = users.cedula;
    
    let inputName = document.querySelector("#name");
    inputName.value = users.nombre;

    let inputLastName = document.querySelector("#last-name");
    inputLastName.value = users.apellido;

    let inputPhone = document.querySelector("#phone-number");
    inputPhone.value = users.telefono;

    let inputEmail = document.querySelector("#email");
    inputEmail.value = users.correoElectronico;
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
function saveEditChanges(user){
    document.getElementById("edit-profile").addEventListener("submit", function(evento){
        evento.preventDefault();

        switch(user){
            case 'admin':
                validateAdminInfo();
                break;
            case 'cliente':
                validateCustomerInfo();
                break;
            case 'vendedor':
                validateVendorInfo();
                break;
            default:
                loadDefaultProfile();
                break;
        }      
    })

}
//Validations

function validateVendorInfo(){
    let name = document.getElementById("name").value;
    let lastName = document.getElementById("last-name").value;
    let phone = document.getElementById("phone-number").value;
    let email = document.getElementById("email").value;
    let tramoName = document.getElementById("input-tramo-name").value;
    let address = document.getElementById("address").value;

    if(name.length<2){
        let nameHelper = document.getElementById("name-helper");
        nameHelper.innerText = "El nombre debe tener al menos dos letras.";
        mostrarHelper(nameHelper);
        return
    }else{
        let nameHelper = document.getElementById("name-helper");
        nameHelper.style.display = "none";
    }

    if(lastName.length<2){
        let lastNameHelper = document.getElementById("last-name-helper");
        lastNameHelper.innerText = "El apellido debe tener al menos dos letras.";
        mostrarHelper(lastNameHelper);
        return;
    }else{
        let lastNameHelper = document.getElementById("last-name-helper");
        lastNameHelper.style.display = "none";
    }

    if(tramoName.length<2){
        let tramoHelper = document.getElementById("input-tramo-name-helper");
        tramoHelper.innerText ="El tramo debe tener al menos dos letras.";
        mostrarHelper(tramoHelper);
        return;
    }else{
        let tramoHelper = document.getElementById("input-tramo-name-helper");
        tramoHelper.style.display ="none";
    }

    if(phone.length<8){
        let phoneHelper = document.getElementById("phone-helper");
        phoneHelper.innerHTML = "El telefono debe tener al menos ocho digitos.";
        mostrarHelper(phoneHelper);
        return;
    }else{
        let phoneHelper = document.getElementById("phone-helper");
        phoneHelper.style.display = "none";
    }

    if(!email.match(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/)){
        let emailHelper = document.getElementById("email-helper");
        emailHelper.innerText = "Correo inválido.";
        mostrarHelper(emailHelper);
        return
    }else{
        let emailHelper = document.getElementById("email-helper");
        emailHelper.style.display = "none"; 
    }

    if(address.length<2){
        let addressHelper = document.getElementById("address-helper");
        addressHelper.innerText ="La direccion debe contener provincia, canton y distrito.";
        mostrarHelper(addressHelper);
        return;
    }else{
        let addressHelper = document.getElementById("address-helper");
        addressHelper.style.display ="none";
    }

    window.location.href = "index.html"; 
}

function validateCustomerInfo(){
    let name = document.getElementById("name").value;
    let lastName = document.getElementById("last-name").value;
    let phone = document.getElementById("phone-number").value;
    let email = document.getElementById("email").value;

    if(name.length<2){
        let nameHelper = document.getElementById("name-helper");
        nameHelper.innerText = "El nombre debe tener al menos dos letras.";
        mostrarHelper(nameHelper);
        return
    }else{
        let nameHelper = document.getElementById("name-helper");
        nameHelper.style.display = "none";
    }

    if(lastName.length<2){
        let lastNameHelper = document.getElementById("last-name-helper");
        lastNameHelper.innerText = "El apellido debe tener al menos dos letras.";
        mostrarHelper(lastNameHelper);
        return;
    }else{
        let lastNameHelper = document.getElementById("last-name-helper");
        lastNameHelper.style.display = "none";
    }

    if(phone.length<8){
        let phoneHelper = document.getElementById("phone-helper");
        phoneHelper.innerHTML = "El telefono debe tener al menos ocho digitos.";
        mostrarHelper(phoneHelper);
        return;
    }else{
        let phoneHelper = document.getElementById("phone-helper");
        phoneHelper.style.display = "none";
    }

    if(!email.match(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/)){
        let emailHelper = document.getElementById("email-helper");
        emailHelper.innerText = "Correo inválido.";
        mostrarHelper(emailHelper);
        return
    }else{
        let emailHelper = document.getElementById("email-helper");
        emailHelper.style.display = "none"; 
    }
    window.location.href = "index.html"; 
}

function validateAdminInfo(){
    let name = document.getElementById("name").value;
    let lastName = document.getElementById("last-name").value;
    let phone = document.getElementById("phone-number").value;
    let email = document.getElementById("email").value;

    if(name.length<2){
        let nameHelper = document.getElementById("name-helper");
        nameHelper.innerText = "El nombre debe tener al menos dos letras.";
        mostrarHelper(nameHelper);
        return
    }else{
        let nameHelper = document.getElementById("name-helper");
        nameHelper.style.display = "none";
    }

    if(lastName.length<2){
        let lastNameHelper = document.getElementById("last-name-helper");
        lastNameHelper.innerText = "El apellido debe tener al menos dos letras.";
        mostrarHelper(lastNameHelper);
        return;
    }else{
        let lastNameHelper = document.getElementById("last-name-helper");
        lastNameHelper.style.display = "none";
    }

    if(phone.length<8){
        let phoneHelper = document.getElementById("phone-helper");
        phoneHelper.innerHTML = "El telefono debe tener al menos ocho digitos.";
        mostrarHelper(phoneHelper);
        return;
    }else{
        let phoneHelper = document.getElementById("phone-helper");
        phoneHelper.style.display = "none";
    }

    if(!email.match(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/)){
        let emailHelper = document.getElementById("email-helper");
        emailHelper.innerText = "Correo inválido.";
        mostrarHelper(emailHelper);
        return
    }else{
        let emailHelper = document.getElementById("email-helper");
        emailHelper.style.display = "none"; 
    }
    window.location.href = "index.html"; 
}

function mostrarHelper(helper){
    helper.style.color = "#fa7d35";
    helper.style.display = "block";
}

//Validations end