const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};

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