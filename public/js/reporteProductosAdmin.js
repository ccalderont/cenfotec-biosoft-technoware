if (localStorage.getItem('tipoUsuario') !== 'admin'){
    window.location.href = '/';
}

loadPage();
let impuestoAdmin = 0;
async function loadPage(){
    impuestoAdmin = await getImpuestoAdmin();
    await loadFilters();
    await loadTable();
}

async function getImpuestoAdmin(){
    const result = await fetch("/getImpuestoAdmin",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await result.json();
    return data.impuesto;
}

async function loadFilters(){
    document.getElementById("product-name-filter").value = "";
    await loadStoresFilter();
    await loadCategoriesFilter();
}

async function loadStoresFilter(){
    const stores = await getStores();
    const select = document.getElementById("store-name-filter");
    select.innerHTML = "<option value=''></option>";
    stores.forEach(store => {
        const option = document.createElement("option");
        option.text = store.nombre;
        option.value = store._id;
        select.add(option);
    });
}

async function loadCategoriesFilter(){
    const categories = await getCategories();
    const select = document.getElementById("category-name-filter");
    select.innerHTML = "<option value=''></option>";
    categories.forEach(category => {
        const option = document.createElement("option");
        option.text = category.nombre;
        option.value = category._id;
        select.add(option);
    });
}

async function getCategories(){
    const result = await fetch("/admin/getAllCategorias",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await result.json();
    return data;
}


async function getStores(){
    const result = await fetch("/admin/getAllStores",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await result.json();
    return data.stores;
}



async function loadTable() {
    const data = await getProducts();
    const table = document.getElementById("tablereport");
    table.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const row = `<tr>
                        <td>${data[i].nombre}</td>
                        <td>${data[i].categoria.nombre}</td>
                        <td>${data[i].tramo.nombre}</td>
                        <td>${data[i].descripcion}</td>
                        <td>${data[i].cantidadDisponible} ${data[i].unidadMedida}</td>
                        <td class="centered-td">${data[i].calificacion} ⭐</td>
                        <td>₡ ${data[i].precioBruto}</td>
                        <td>₡ ${getTotalPrice(data[i].precioBruto, data[i].impuesto)}</td>
                        <td>
                            <label class="switch" >
                                <input onclick=changeStatus("${data[i]._id}") type="checkbox" ${data[i].estado === 'activo' ? 'checked': ""}>
                                <span class="slider round"></span>
                            </label>
                        </td>
                    </tr>`;
        table.innerHTML += row;
    }
}

function getTotalPrice(precio, impuesto){
    return precio + (precio * (impuesto + impuestoAdmin) / 100);
} 

async function getProducts(){
    const result = await fetch("/admin/getAllProductsFilterd",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: document.getElementById("product-name-filter").value,
            tramo: document.getElementById("store-name-filter").value,
            categoria: document.getElementById("category-name-filter").value
        })
    });
    const data = await result.json();
    return data.products;
}
    

async function changeStatus(id){
    //Ask the user for confirmation
    const reason = prompt("Ingrese la razón por la que desea cambiar el estado del producto. Esta será comunicada al dueño del tramo.");	
    if(!reason || reason === "") {
        location.reload();
        return;
    }
    const result = await fetch('/admin/cambiarEstadoProducto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idProducto: id,
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
