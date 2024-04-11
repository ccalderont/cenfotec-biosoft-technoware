const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};

exports.getMisCompras = (req, res) => {
    const fileName = 'misCompras.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getMisVentas = (req, res) => {
    const fileName = 'misVentas.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}