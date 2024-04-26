loadPage();
let gananciaTotal = 0;
let balanceTotal = 0;

/**
 * Set the dynamic information of the page
 */
async function loadPage(){
    setDates();
    await setClientFilter();
    await setStoreFilter();
    await setProductFilter();
    loadTable();

} 

async function setProductFilter(){
    const products = await getProducts();
    const select = document.getElementById('producto-select');
    select.innerHTML = '<option value=""></option>'
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product._id;
        option.innerText = product.nombre;
        select.appendChild(option);
    });
}

async function getProducts(){
    const response = await fetch('/admin/getAllProducts',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}


async function setClientFilter(){
    const clients = await getClients();
    const select = document.getElementById('cliente-select');
    select.innerHTML = '<option value=""></option>'
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client._id;
        option.innerText = client.nombre + " " + client.apellido;
        select.appendChild(option);
    });
}

async function getClients(){
    const response = await fetch('/admin/getAllClients',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data.clients;
}

async function setStoreFilter(){
    const stores = await getStores();
    const select = document.getElementById('tramo-select');
    select.innerHTML = '<option value=""></option>'
    stores.forEach(store => {
        const option = document.createElement('option');
        option.value = store._id;
        option.innerText = store.nombre;
        select.appendChild(option);
    });
}

async function getStores(){
    const response = await fetch('/admin/getAllStores',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data.stores;
}

function setDates(){
    const today = new Date();
    document.getElementById('date-filter-to').value = today.toISOString().split('T')[0];
    today.setDate(today.getDate() - 30);
    document.getElementById('date-filter-from').value = today.toISOString().split('T')[0];
}

    
    
async function loadTable() {
    gananciaTotal = 0;
    balanceTotal = 0;
    const ventas = await getVentas();
    const table = document.getElementById("tablereport");
    table.innerHTML = '';
    const storeSelected = document.getElementById('tramo-select').value;
    const clientSelected = document.getElementById('cliente-select').value;
    const productSelected = document.getElementById('producto-select').value;
    ventas.forEach((venta) => {
        if(clientSelected !== "" && venta.usuario._id !== clientSelected) return;
        let date = new Date(venta.fecha);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        venta.productos.forEach((compra) => {
            if(storeSelected !== "" && compra.tramo._id !== storeSelected) return;
            if(productSelected !== "" && compra.producto._id !== productSelected) return;
            
            const row = `<tr>
                            <td>${formattedDate}</td>
                            <td>${venta.usuario.nombre} ${venta.usuario.apellido}</td>
                            <td>${compra.tramo.nombre}</td>
                            <td>${compra.producto.nombre}</td>
                            <td>${compra.cantidad}</td>
                            <td>₡${getBalanceTotal(compra.precioConImpuestoAdmin)}</td>
                            <td>₡${getGananciasAdmin(compra.precioConImpuestoAdmin, compra.precioSinImpuestoAdmin)}</td>
                        </tr>`;
            table.innerHTML += row;
        });
    });
    setUpTotalGanancias()
    setUpBalanceTotal();
}

function getBalanceTotal(precioConImpuestoAdmin){
    balanceTotal += precioConImpuestoAdmin;
    return precioConImpuestoAdmin;
}

function getGananciasAdmin(precioConImpuestoAdmin, precioSinImpuestoAdmin){
    const ganancia = precioConImpuestoAdmin - precioSinImpuestoAdmin;
    gananciaTotal += ganancia;
    return ganancia;
}



async function getVentas(){
    const response = await fetch('/admin/getAllSales',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fechaInicio: document.getElementById('date-filter-from').value,
            fechaFin: document.getElementById('date-filter-to').value,
            idCliente: document.getElementById('cliente-select').value,
            idTramo: document.getElementById('tramo-select').value,
            idProducto: document.getElementById('producto-select').value
        })
    });
    const data = await response.json();
    return data.ventas;
}

function setUpBalanceTotal(){
    const totalPrice = document.getElementById('balanceTotal');
    totalPrice.innerText = `Balance total: ₡ ${balanceTotal}`;
}
    
function setUpTotalGanancias(){
    const totalPrice = document.getElementById('gananciasAdmin');
    totalPrice.innerText = `Ganancias totales de admin: ₡ ${gananciaTotal}`;
}
    
/**
 * Returns the total brute expense of all the sells currently showing in the page
 * @returns {number} - Total expense of all the sells
 */
function getTotalGanancias(){
    return VentasReport.reduce((acc, sell) => acc + sell.Ganancias_admin, 0);
}