const UsuarioReport = [
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
buildTable(UsuarioReport);

function buildTable(data) {
    const table = document.getElementById("tablereport");

    for (let i = 0; i < data.length; i++) {
        const row = `<tr>
                        <td>${data[i].TipoDeUsuario}</td>
                        <td>${data[i].NombreDeUsuario}</td>
                        <td>${data[i].IdDeUsuario}</td>
                        <td>${data[i].Tramo}</td>
                        <td>${data[i].CorreoElectronico}</td>
                        <td>${data[i].Telefono}</td>
                    </tr>`;
        table.innerHTML += row;
    }
}
    