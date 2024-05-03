if (localStorage.getItem('tipoUsuario') !== 'admin'){
    window.location.href = '/';
}

loadPage();



async function loadPage(){
    await setVendorFilter();
    buildTable();
}

async function setVendorFilter(){
    const vendors = await getVendors();
    const select = document.getElementById('vendor-select');
    select.innerHTML = '<option value=""></option>'
    vendors.forEach(vendor => {
        const option = document.createElement('option');
        option.value = vendor._id;
        option.innerText = vendor.nombre + " " + vendor.apellidos;
        select.appendChild(option);
    });
}

async function getVendors(){
    const response = await fetch('/admin/getAllVendors',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data.vendors;
}

async function getTramos(){
    const response = await fetch('/admin/obtenerTramos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify( {idUsuario: document.getElementById("vendor-select").value})
           
        
    });
    const data= await response.json()
    return data
}

async function buildTable() {
    const data= await getTramos()
    const table = document.getElementById("tablereport");
table.innerHTML=""

    for (let i = 0; i < data.length; i++) {
        const row = `<tr>
                        <td>${data[i].nombre}</td>
                        <td>${data[i].direccion}</td>
                        <td>${data[i].usuario.nombre} ${data[i].usuario.apellidos}</td>
                        <td class="centered-td">${data[i].calificacion} ⭐</td>
                        <td>
                            <label class="switch" >
                                <input onclick=changeStatus("${data[i]._id}") type="checkbox" ${data[i].estado === 'activo' ? 'checked': ""}>
                                <span class="slider round"></span>
                            </label>
                        </td>
                    </tr>`;
        table.innerHTML += row;
    }
};

async function changeStatus(id){
    //Ask the user for confirmation
    const reason = prompt("Ingrese la razón por la que desea cambiar el estado del tramo. Esta será comunicada al dueño del tramo.");	
    if(!reason || reason === "") {
        location.reload();
        return;
    }
    const result = await fetch('/admin/cambiarEstadoTramo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idTramo: id,
            razon: reason
        })
    });
    const data = await result.json();
    if(data.message !== "Estado actualizado"){
        alert("Hubo un error al actualizar el producto");
        location.reload();
        return;
    }
    alert("Estado actualizado exitosamente");
}