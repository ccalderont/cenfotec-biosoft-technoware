changePasswordView();
saveChanges();
loadSellerProfile();

/**
 * Retrieve the change-password-view by clicking on the button "Cambiar contraseña". 
 */
function changePasswordView(){
    document.getElementById("btn-change-password").addEventListener("click", function(evento){
        evento.preventDefault();

        window.location.href = "index.html";
    })
}

/**
 * Save the inputs added by the seller. 
 * All the inputs are validated before saving the changes. In case of errors in the input a message is displayed below the input.  
 * THIS METHOD WILL BE UPDATED ONCE THE CONNECTION TO THE DB HAS BEEN SET!!!
 */
function saveChanges(){
    document.getElementById("edit-profile").addEventListener("submit", function(evento){
        evento.preventDefault();

        let name = document.getElementById("name").value;
        let lastName = document.getElementById("last-name").value;
        let tramoName = document.getElementById("input-tramo-name").value;
        let phone = document.getElementById("phone-number").value;
        let email = document.getElementById("email").value;
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
    })
}

/**
 * Display and style the message-helper in case of an error in the input.
 * 
 * @param {*} helper 
 */
function mostrarHelper(helper){
    helper.style.color = "#fa7d35";
    helper.style.display = "block";
}

/**
 * Load all the information of the seller.
 * THIS METHOD WILL BE UPDATED ONCE THE CONNECTION TO THE DB HAS BEEN SET!!!
 */
function loadSellerProfile(){
    let userType = document.querySelector("#user-type");
    userType.innerHTML = "Vendedor"

    let userName = document.querySelector("#user-name");
    userName.innerHTML = "Christian XXXX"

    let tramoName = document.querySelector("#tramo-name");
    tramoName.innerHTML = "Tramo de frutas";
    
    let identificationNumber = document.querySelector("#identification-number");
    identificationNumber.innerHTML = "1-XXXX-XXXX89";
    
    let inputName = document.querySelector("#name");
    inputName.value = "Christian";

    let inputLastName = document.querySelector("#last-name");
    inputLastName.value = "Calderon";

    let inputTramoName = document.querySelector("#input-tramo-name");
    inputTramoName.value = "Tramo de frutas";

    let inputPhone = document.querySelector("#phone-number");
    inputPhone.value = "88556699";

    let inputEmail = document.querySelector("#email");
    inputEmail.value = "c@gmail.com";

    let inputAddress = document.querySelector("#address");
    inputAddress.value = "San Fra";
}

