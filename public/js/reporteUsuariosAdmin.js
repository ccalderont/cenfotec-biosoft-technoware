const oldUsuarioReport = [
{
    TipoDeUsuario : "vendedor",
    NombreDeUsuario : "Christian Calderon",
    IdDeUsuario : "1-1111-1111",
    Tramo : "Campo Verde",
    CorreoElectronico: "campoverde@technoware.com",
    Telefono:"6666-6666",
},
{
    TipoDeUsuario : "Cliente",
    NombreDeUsuario : "Monica Pererira",
    IdDeUsuario : "1-1111-1111",
    Tramo : "No Aplica",
    CorreoElectronico: "monip@technoware.com",
    Telefono:"6666-6666",
},
{
    TipoDeUsuario : "Cliente",
    NombreDeUsuario : "Maricruz Reyes",
    IdDeUsuario : "1-1111-1111",
    Tramo : "No Aplica",
    CorreoElectronico: "maryr@technoware.com",
    Telefono:"6666-6666",
},
{
    TipoDeUsuario : "vendedor",
    NombreDeUsuario : "Carolina Araya",
    IdDeUsuario : "1-1111-1111",
    Tramo : "Las Rosas",
    CorreoElectronico: "lasrosas@technoware.com",
    Telefono:"6666-6666",
},
{
    TipoDeUsuario : "vendedor",
    NombreDeUsuario : "Daniel Marin",
    IdDeUsuario : "1-1111-1111",
    Tramo : "Granja Saludable",
    CorreoElectronico: "granjasaludable@technoware.com",
    Telefono:"6666-6666",
},
];

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
                        <td>${usuario.tipoUsuario}</td>
                        <td>${usuario.nombre} ${usuario.apellido}</td>
                        <td>${usuario.cedula}</td>
                        <td>${usuario.estado}</td>
                        <td>${usuario.tramo ? usuario.tramo.nombre : "No aplica"}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.telefono}</td>
                    </tr>`;
        table.innerHTML += row;
    });
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
    