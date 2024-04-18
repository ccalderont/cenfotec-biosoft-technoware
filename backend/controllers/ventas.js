
const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};

exports.getCarrito = (req, res) => {
    const fileName = 'carrito.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });


//sales report manager controller
exports.getReportSalesAdmin = (req, res) => {
    const fileName = 'reporteVentasAdmin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
