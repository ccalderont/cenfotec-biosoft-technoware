function generaTabla() {
    const productos = [
        { nombre: 'Manzanas', precio: 400, cantidad: 6 },
        { nombre: 'Plátanos', precio: 100, cantidad: 10 },
        { nombre: 'Camotes', precio: 150, cantidad: 4 },
        { nombre: 'Cebollas', precio: 200, cantidad: 9 },
        { nombre: 'Ajos', precio: 60, cantidad: 13 },
        { nombre: 'Lechugas', precio: 550, cantidad: 2 },
        // Agrega más productos aquí
    ];

    const tablaBody = document.querySelector('tbody');
    const totalElement = document.getElementById("total");
    let total = 0;


    productos.forEach(producto => {
        const fila = document.createElement('tr');
        const subTotal = producto.precio * producto.cantidad;
        total += subTotal;


        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td>${subTotal.toFixed(2)}</td>
                    
        `;

        tablaBody.appendChild(fila);

    });

    totalElement.textContent = total.toFixed(2);


}

generaTabla();

let openModal = document.getElementById("complete")
let cardModal = document.getElementById("modal")
let closeModal = document.getElementById("close")

// open modal

openModal.onclick = function () {

    cardModal.style.visibility = "visible";
}

// close modal

closeModal.onclick = function () {
    cardModal.style.visibility = "hidden";
}

// close window modal

cardModal.onclick = function () {
    cardModal.style.visibility = "hidden";
}