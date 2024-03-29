changePasswordView();
actionForButton();

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
 * Display a message after clicking on the button located within the form. 
 * Creates two new elements, div and h2, which will be located at the bottom part of the form. The message is styled in red, centered and padded.
 */
function actionForButton(){
    document.getElementById("edit-profile").addEventListener("submit", function(evento){
        evento.preventDefault();

        let form = document.getElementById("edit-profile");
        let confirmEdition = document.createElement("div");
        let confirmEditionMessage = document.createElement("h2");
        confirmEditionMessage.innerHTML = "Edición confirmada";

        confirmEdition.appendChild(confirmEditionMessage);
        form.appendChild(confirmEdition).style.cssText = 'color:red;text-align:center;padding:30px 0 15px 0';
    })
}