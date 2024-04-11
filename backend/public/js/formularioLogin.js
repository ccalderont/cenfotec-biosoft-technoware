document.getElementById('button-continue').addEventListener('click', checkLogin);
clearLoginData();

function checkLogin(){
    const loginName = document.getElementById('input-id').value;
    const loginPassword = document.getElementById('input-password').value;

    switch(loginName){
        case 'admin':
            localStorage.setItem('user', 'admin');
            break;
        case 'cliente':
            localStorage.setItem('user', 'cliente')
            break;
        case 'vendedor':
            localStorage.setItem('user', 'vendedor')   
            break;
        default:
            localStorage.removeItem('user');
            break;
    }

    window.location = '/';
}



function clearLoginData(){
    localStorage.removeItem('user');
}

function createAccount(){
    const accountType = document.getElementById('account-type').value;
    
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

function showModal() {
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
}

function goToNewAccount(){
    const accountType = document.querySelector('input[name="accountType"]:checked').value;
    if(accountType === 'cliente'){
        window.location.href = '../html/registroCliente.html';
    }else{
        window.location.href = '../html/registroVendedor.html';
    }
}