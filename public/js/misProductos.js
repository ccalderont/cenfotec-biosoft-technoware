if (localStorage.getItem('tipoUsuario') !== 'vendedor'){
    window.location.href = '/';
}

loadPage();
let impuestoAdmin = 0;

async function loadPage(){
    impuestoAdmin = await getAdminImpuesto();
    await setFilters();
    await loadTable();
}

async function getAdminImpuesto(){
    const result = await fetch('/getImpuestoAdmin',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await result.json();
    return data.impuesto;
}

async function setFilters(){
    const categories = await getCategories();
    const select = document.getElementById('category-select');
    select.innerHTML = '<option value=""></option>'
    categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category._id;
        option.innerText = category.nombre;
        select.appendChild(option);
    });
}

async function getCategories(){
    const result = await fetch('/getActiveCategories',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await result.json();
    return data.categorias;
}

async function getProducts(){
    const result = await fetch('/vendedor/obtenerProductos',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            categoria: document.getElementById('category-select').value,
            usuario: localStorage.getItem('idUsuario')
        })
    });
    const data = await result.json();
    return data.products;
}

async function loadTable() {
    const data = await getProducts();
    const table = document.getElementById("tablereport");
    table.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const row = `<tr>
                        <td>${data[i].nombre}</td>
                        <td><img class='product-img' src='${data[i].foto}'></td>
                        <td>${data[i].categoria.nombre}</td>
                        <td>${data[i].descripcion}</td>
                        <td class="editable-td">
                            <div>
                                <input style="width: 50%;"
                                    type="number" 
                                    min="0"
                                    max="999999"
                                    id="cantidad-${data[i]._id}"
                                    value="${data[i].cantidadDisponible}"
                                >
                                ${data[i].unidadMedida}
                            </div><br>
                            <button style="padding: 0.2rem;"
                                onclick="updateQuantity(this)" 
                                data-productid="${data[i]._id}">Actualizar
                            </button>
                        </td>
                        <td>${data[i].estado}</td>
                        
                        <td class="editable-td">
                            <div>
                                ₡<input style="width: 80%;"
                                type="number" 
                                min="0"
                                max="999999"
                                id="precio-${data[i]._id}"
                                value="${data[i].precioBruto}"
                                >
                            </div><br>
                            <button style="padding: 0.2rem;"
                                onclick="updatePrice(this)" 
                                data-productid="${data[i]._id}">Actualizar
                            </button>
                        </td>
                        <td class="editable-td">
                            <div>
                                <input style="width: 80%;"
                                type="number" 
                                min="0"
                                max="999999"
                                id="impuesto-${data[i]._id}"
                                value="${data[i].impuesto}"
                                >%
                            </div><br>
                            <button style="padding: 0.2rem;"
                                onclick="updateTax(this)" 
                                data-productid="${data[i]._id}">Actualizar
                            </button>
                        </td>
                        <td>₡${calculateFullPrice(data[i].precioBruto, data[i].impuesto)}</td>
                        <td>${data[i].calificacion} ⭐</td>
                    </tr>`;
        table.innerHTML += row;
    }
}

function calculateFullPrice(precioBruto, impuesto){
    return precioBruto + (precioBruto * (impuesto+ impuestoAdmin))/100;
}

async function updateTax(target){
    const result = await fetch('/vendedor/actualizarImpuesto',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            producto: target.dataset.productid,
            impuesto: document.getElementById(`impuesto-${target.dataset.productid}`).value
        })
    });
    const data = await result.json();
    if(data.message === 'Producto actualizado'){
        alert('Producto actualizado');
        location.reload();
        return;
    }
    alert('Hubo un error al actualizar el producto');
    return;
}

async function updatePrice(target){
    const result = await fetch('/vendedor/actualizarPrecio',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            producto: target.dataset.productid,
            precio: document.getElementById(`precio-${target.dataset.productid}`).value
        })
    });
    const data = await result.json();
    if(data.message === 'Producto actualizado'){
        alert('Producto actualizado');
        location.reload();
        return;
    }
    alert('Hubo un error al actualizar el producto');
    return;
}

async function updateQuantity(target){
    const result = await fetch('/vendedor/actualizarCantidad',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            producto: target.dataset.productid,
            cantidad: document.getElementById(`cantidad-${target.dataset.productid}`).value
        })
    });
    const data = await result.json();
    if(data.message === 'Producto actualizado'){
        alert('Producto actualizado');
        return;
    }
    alert('Hubo un error al actualizar el producto');
    return;
}