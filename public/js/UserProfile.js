const idUsuario = localStorage.getItem("idUsuario");

changePasswordView();
saveEditChanges();
loadProfileFields();

/**
 * Retrieve the change-password-view by clicking on the button "Cambiar contraseña". 
 */
function changePasswordView(){
    document.getElementById("btn-change-password").addEventListener("click", function(evento){
        evento.preventDefault();

        window.location.href = "/restablecerContrasena";
    })
}

async function loadProfileFields(){
    
    const response = await fetch(`/admin/perfilAdministrador/${idUsuario}`, {method:"GET",});    
    const userData = await response.json();

    switch(userData.tipoUsuario){
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

async function loadSellerProfile(){
    loadMainProfileInfo();

    const userType = document.querySelector("#user-type");   
    let tramoName = document.querySelector("#tramo-name");
    let inputTramoName = document.querySelector("#input-tramo-name");
    let inputAddress = document.querySelector("#address");
    
    const response = await fetch(`/admin/perfilAdministrador/${idUsuario}`, {method:"GET",});
    const userData = await response.json();

    userType.innerHTML = "Vendedor(a)";
    tramoName.innerHTML = userData.tramo.nombre;
    inputTramoName.value = userData.tramo.nombre;
    inputAddress.value = userData.tramo.direccion;
}

function loadAdminProfile(){
    let userType = document.querySelector("#user-type");
    userType.innerHTML = "Administrador";

    removeVendorOptions();
    loadMainProfileInfo();
}

function loadCustomerProfile(){
    const userType = document.querySelector("#user-type");
    userType.innerHTML = "Cliente";

    removeVendorOptions();
    loadMainProfileInfo();
}

async function loadMainProfileInfo(){
    const response = await fetch(`/admin/perfilAdministrador/${idUsuario}`, {method:"GET",});
    const userData = await response.json();

    let userName = document.querySelector("#user-name");
    let identificationNumber = document.querySelector("#identification-number");
    let inputName = document.querySelector("#name");
    let inputLastName = document.querySelector("#last-name");
    let inputPhone = document.querySelector("#phone-number");
    let inputEmail = document.querySelector("#email");

    userName.innerHTML = userData.nombre + " " + userData.apellidos;
    identificationNumber.innerHTML = userData.cedula;
    inputName.value = userData.nombre;
    inputLastName.value = userData.apellidos;
    inputPhone.value = userData.telefono;
    inputEmail.value = userData.email;
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

async function saveEditChanges(){   
    const response = await fetch(`/admin/perfilAdministrador/${idUsuario}`, {method:"GET",});
    const userData = await response.json();

    document.getElementById("edit-profile").addEventListener("submit", function(evento){
        evento.preventDefault();

        switch(userData.tipoUsuario){
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

async function validateVendorInfo(){
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

    const response = await fetch(`/admin/perfilAdministrador/${idUsuario}`, {method:"GET",});
    const userData = await response.json();

    const responseTwo = await fetch("/admin/perfilAdministrador", {method:"PUT", headers:{
        "Content-Type":"application/json",
    },
    body: JSON.stringify({
        id: idUsuario,
        nombre: name,
        apellidos: lastName,
        telefono: phone,
        email: email,
        tramoID: userData.tramo._id,
        tramoNombre: tramoName,
        tramoDireccion: address
    })
    });

    window.location.href = "/"; 
}

async function validateCustomerInfo(){
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


    const response = await fetch(`/admin/perfilAdministrador`, {method:"PUT",
    headers:{
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: idUsuario,
        nombre: name,
        apellidos: lastName,
        telefono: phone,
        email: email
    })
    });  

    window.location.href = "/"; 
}

async function validateAdminInfo(){
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


    const response = await fetch(`/admin/perfilAdministrador`, {method:"PUT",
    headers:{
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: idUsuario,
        nombre: name,
        apellidos: lastName,
        telefono: phone,
        email: email
    })
    });   

    window.location.href = "/"; 
};

function mostrarHelper(helper){
    helper.style.color = "#fa7d35";
    helper.style.display = "block";
}

//Validations end