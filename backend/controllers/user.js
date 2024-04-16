const path = require('path');

const options = {
    root: path.join(__dirname, '../views')
};

exports.getLogin = (req, res) => {
    const fileName = 'formularioLogin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

//Registro Cliente
exports.getRegistroCliente = (req, res) => {
    const fileName = 'RegistroCliente.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}


//Registro Vendedor
exports.getRegistroVendedor = (req, res) => {
    const fileName = 'RegistroVendedor.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}