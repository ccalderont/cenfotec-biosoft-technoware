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

    window.location = 'index.html';
}



function clearLoginData(){
    localStorage.removeItem('user');
}