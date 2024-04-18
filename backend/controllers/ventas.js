const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};

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
}