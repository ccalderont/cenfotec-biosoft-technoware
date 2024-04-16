const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};

exports.getImpuestoAdmin = (req, res) => {
    const fileName = 'impuestAdmin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getRegistrarCategoria = (req, res) => {
    const fileName = 'registroCategoria.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}