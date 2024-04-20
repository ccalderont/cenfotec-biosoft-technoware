const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};

exports.getReportProductsAdmin = (req, res) => {
    const fileName = 'reporteProductosAdmin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getRegistrarProducto = (req, res) => {
    const fileName = 'registrarprod.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getMisProductos = (req, res) => {
    const fileName = 'misProductos.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}