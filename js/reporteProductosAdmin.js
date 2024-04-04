const ProductsReport = [
{
    Categoria : "verduras",
    Tramo : "La Rosas",
    Producto : "Zanahoria",
    Detalle : "zanahorias frescas, sembradas naturalmente y libre de quimicos",
    Cantidad: "60",
    Unidad:"kilos",
    PrecioSinImpuesto: "600",
    PrecioConImpuesto: "700",

},
{
    Categoria : "verduras",
    Tramo : "Campo verde",
    Producto : "Zanahoria unidades",
    Detalle : "zanahorias frescas, sembradas naturalmente y libre de quimicos",
    Cantidad: "90",
    Unidad:"kilos",
    PrecioSinImpuesto: "650",
    PrecioConImpuesto: "750",
},
{
    Categoria : "Fruta",
    Tramo : "La Rosas",
    Producto : "Manzana mixta",
    Detalle : "Manzanas mixtas importadas desde california EEUU",
    Cantidad: "30",
    Unidad:"kilos",
    PrecioSinImpuesto: "1000",
    PrecioConImpuesto: "1100",
},
{
    Categoria : "Fruta",
    Tramo : "Campo Verde",
    Producto : "Manzana mixta",
    Detalle : "frescas manzanas libres de quimicos",
    Cantidad: "60",
    Unidad:"kilos",
    PrecioSinImpuesto: "900",
    PrecioConImpuesto: "1000",
},
{
    Categoria : "verduras",
    Tramo : "Granja saludable",
    Producto : "cebolla",
    Detalle : "Sembrada en San Carlos, libre de pesticidas y  quimicos",
    Cantidad: "70",
    Unidad:"kilos",
    PrecioSinImpuesto: "800",
    PrecioConImpuesto: "825",
},
];
buildTable(ProductsReport);

function buildTable(data) {
    const table = document.getElementById("tablereport");

    for (let i = 0; i < data.length; i++) {
        const row = `<tr>
                        <td>${data[i].Categoria}</td>
                        <td>${data[i].Tramo}</td>
                        <td>${data[i].Producto}</td>
                        <td>${data[i].Detalle}</td>
                        <td>${data[i].Cantidad} ${data[i].Unidad}</td>
                        <td>${data[i].PrecioSinImpuesto}</td>
                        <td>${data[i].PrecioConImpuesto}</td>
                    </tr>`;
        table.innerHTML += row;
    }
}
    