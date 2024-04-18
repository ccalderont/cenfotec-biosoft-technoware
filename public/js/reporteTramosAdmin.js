const TramoReport = [
{
    Tramo : "La Rosas",
    Ubicacion:"San Jose, desamparados, desamparados",
    Producto : "Zanahoria",
    Cantidad: "60",
    Unidad:"kilos",
    Descripcion: "zanahorias frescas, sembradas naturalmente y libre de quimicos",
    Calificacion: "2",

},
{
    Tramo : "Campo verde",
    Ubicacion:"San Jose, desamparados, desamparados",
    Producto : "Zanahoria unidades",
    Cantidad: "90",
    Unidad:"kilos",
    Descripcion: "zanahorias frescas, sembradas naturalmente y libre de quimicos",
    Calificacion: "5",
},
{
    Tramo : "La Rosas",
    Ubicacion:"San Jose, desamparados, desamparados",
    Producto : "Manzana mixta",
    Cantidad: "30",
    Unidad:"kilos",
    Descripcion: "Manzanas mixtas importadas desde california EEUU",
    Calificacion:"5",
},
{
    Tramo : "Campo Verde",
    Ubicacion:"San Jose, desamparados, desamparados",
    Producto : "Manzana mixta",
    Cantidad: "60",
    Unidad:"kilos",
    Descripcion: "frescas manzanas libres de quimicos",
    Calificacion:"4",
},
{
    Tramo : "Granja saludable",
    Ubicacion:"San Jose, desamparados, desamparados",
    Producto : "cebolla",
    Cantidad: "70",
    Unidad:"kilos",
    Descripcion: "Sembrada en San Carlos, libre de pesticidas y  quimicos",
    Calificacion:"3",
},
];
buildTable(TramoReport);

function buildTable(data) {
    const table = document.getElementById("tablereport");

    for (let i = 0; i < data.length; i++) {
        const row = `<tr>
                        <td>${data[i].Tramo}</td>
                        <td>${data[i].Ubicacion}</td>
                        <td>${data[i].Producto}</td>
                        <td>${data[i].Cantidad} ${data[i].Unidad}</td>
                        <td>${data[i].Descripcion}</td>
                        <td class="centered-td">${data[i].Calificacion} ⭐</td>
                    </tr>`;
        table.innerHTML += row;
    }
};
    