
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
                    </tr>`;
        table.innerHTML += row;
    }
};
    