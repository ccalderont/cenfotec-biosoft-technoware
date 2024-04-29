loadPage()

function loadPage(){
    setFilters();
    loadTable();
}

function setFilters(){
    document.getElementById('estado-select').value = "";
    document.getElementById('tipo-select').value = "";
}

async function loadTable() {
    const usuarios = await getUsers();
    const table = document.getElementById("tablereport");
    table.innerHTML = '';
    usuarios.forEach((usuario) => {
        const row = `<tr>
                        <td>${usuario.nombre} ${usuario.apellidos}</td>
                        <td>${usuario.tipoUsuario}</td>
                        <td>${usuario.cedula}</td>
                        <td>${usuario.tramo ? usuario.tramo.nombre : "No aplica"}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.telefono}</td>
                        <td>
                            <label class="switch" >
                                <input onclick=changeStatus("${usuario._id}") type="checkbox" ${usuario.estado === 'activo' ? 'checked': ""}>
                                <span class="slider round"></span>
                            </label>
                        </td>
                    </tr>`;
        table.innerHTML += row;
    });
}

async function changeStatus(id){
    //Ask the user for confirmation
    const confirmation = confirm("¿Está seguro que desea cambiar el estado del usuario?");
    if(!confirmation){
        location.reload();
        return;
    }
    const result = await fetch('/admin/cambiarEstadoUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idUsuario: id
        })
    });
    const data = await result.json();
    if(data.message !== "Estado actualizado"){
        alert(data.message);
        return;
    }
}

async function getUsers(){
    const result = await fetch('/admin/getAllUsers',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            estado: document.getElementById('estado-select').value,
            tipoUsuario: document.getElementById('tipo-select').value
        })
    });
    const data = await result.json();
    return data.users;
}
    