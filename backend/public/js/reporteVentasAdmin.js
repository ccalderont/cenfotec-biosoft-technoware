const VentasReport = [
    {
        Fecha: "2021-10-10",
        Tramo: "Campo Verde",
        Producto: "Manzanas",
        Cantidad : "10",
        Precio_total: 1200,
        Ganancias_admin: 5,
        
    },
    {
        Fecha: "2021-10-10",
        Tramo: "Campo Verde",
        Producto: "Fresas",
        Cantidad : "11",
        Precio_total: 1200,
        Ganancias_admin: 5,
    
    },
    {
        Fecha: "2021-10-10",
        Tramo: "Rosales",
        Producto: "Manzanas",
        Cantidad : "10",
        Precio_total: 1210,
        Ganancias_admin: 4,
    
    },
    {
        Fecha: "2021-10-10",
        Tramo: "Granja saludable",
        Producto: "Manzanas",
        Cantidad : "13",
        Precio_total: 1400,
        Ganancias_admin: 10,
    
    },
    {
        Fecha: "2021-10-10",
        Tramo: "Campo Verde",
        Producto: "limones",
        Cantidad : "20",
        Precio_total:1300,
        Ganancias_admin:10,
    
    },
    ];
    buildTable(VentasReport);
    setUpTotalGanancias()
    function buildTable(data) {
        const table = document.getElementById("tablereport");
    
        for (let i = 0; i < data.length; i++) {
            const row = `<tr>
                            <td>${data[i].Fecha}</td>
                            <td>${data[i].Tramo}</td>
                            <td>${data[i].Producto}</td>
                            <td>${data[i].Cantidad}</td>
                            <td>₡${data[i].Precio_total}</td>
                            <td>₡${data[i].Ganancias_admin}</td>
                        </tr>`;
            table.innerHTML += row;
        }
    }
    
    function setUpTotalGanancias(){
        const totalPrice = document.getElementById('balance');
        const total = getTotalGanancias();
        totalPrice.innerText = `Total Ganancias: ₡${total}`;
    }
    
    /**
     * Returns the total brute expense of all the sells currently showing in the page
     * @returns {number} - Total expense of all the sells
     */
    function getTotalGanancias(){
        return VentasReport.reduce((acc, sell) => acc + sell.Ganancias_admin, 0);
    }