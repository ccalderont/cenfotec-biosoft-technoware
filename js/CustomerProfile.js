changePasswordView();
saveChanges();
loadCustomerProfile();

/**
 * Retrieve the change-password-view by clicking on the button "Cambiar contraseña". 
 * THIS METHOD WILL BE UPDATED ONCE THE CHANGE-PASSWORD-VIEW HAS BEEN CREATED!!!
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
 * Load all the information of the admin.
 * THIS METHOD WILL BE UPDATED ONCE THE CONNECTION TO THE DB HAS BEEN SET!!!
 */
function loadCustomerProfile(){
    let userType = document.querySelector("#user-type");
    userType.innerHTML = "Cliente"

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

